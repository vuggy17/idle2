/* eslint-disable no-await-in-loop */
import { Unreachable } from '@idle/env/constant';
import { groupBy } from 'lodash-es';
import { reaction } from 'mobx';
import { applySnapshot, clone, fromSnapshot, getSnapshot } from 'mobx-keystone';
import { Observable, Subject } from 'rxjs';

import { FriendRequest } from '../../data/domain/friend-request';
import { LiveData } from '../../../livedata';
import { ID } from '../../../utils/id';
import { AsyncPriorityQueue } from '../async-priority-queue';
import { RequestStorageInner } from './storage';

type LocalEngineState = {
  syncing: number;
  total: number;
};

type Job =
  | {
      type: 'load';
      docId: string;
    }
  | {
      type: 'save';
      docId: string;
      update: FriendRequest;
    }
  | {
      type: 'apply';
      docId: string;
      update: FriendRequest;
      isInitialize: boolean;
    };

export class FriendRequestLocalPeer {
  private readonly prioritySettings = new Map<string, number>();

  private statusUpdated$ = new Subject<string>();

  private state = {
    requests: new Map<string, FriendRequest>(),
    loadedRequests: new Set<string>(),
    jobMap: new Map<string, Job[]>(),
    currentJob: null as { reqId: string; jobs: Job[] } | null,
    jobQueue: new AsyncPriorityQueue(),
  };

  status$ = LiveData.from<LocalEngineState>(
    new Observable((subscribe) => {
      const next = () => {
        subscribe.next({
          total: this.state.requests.size,
          syncing: this.state.jobMap.size + (this.state.currentJob ? 1 : 0),
        });
      };
      next();
      this.statusUpdated$.subscribe(() => {
        next();
      });
    }),
    { syncing: 0, total: 0 },
  );

  readonly jobs = {
    load: async (job: Job & { type: 'load' }, signal?: AbortSignal) => {
      signal?.throwIfAborted();

      const req = this.state.requests.get(job.docId);
      if (!req) {
        throw new Unreachable('Request not found');
      }

      this.schedule({
        type: 'save',
        docId: req.id,
        update: req,
      });

      reaction(
        () => getSnapshot(req),
        (snapshot) =>
          this.handleRequestUpdate(
            req.id,
            fromSnapshot<FriendRequest>(snapshot, { generateNewIds: false }),
          ),
      );

      const data = await this.storage.loadRequestFromLocal(job.docId);
      if (data) {
        applySnapshot(req, data);
        this.state.loadedRequests.add(req.id);
        this.statusUpdated$.next(req.id);
      }
    },
    apply: async (job: Job & { type: 'apply' }, signal?: AbortSignal) => {
      signal?.throwIfAborted();
      if (this.state.loadedRequests.has(job.docId)) {
        const req = this.state.requests.get(job.docId);
        if (req) {
          req.apply(job.update);
        }
      }
    },
    save: async (
      reqId: string,
      jobs: Array<Job & { type: 'save' }>,
      signal?: AbortSignal,
    ) => {
      signal?.throwIfAborted();

      const doc = this.state.requests.get(reqId);
      if (!doc) throw new Unreachable('no doc found');

      const merged = jobs.reduce(
        (acc, { update }) => {
          return acc.apply(update);
        },
        clone(doc, { generateNewIds: false }),
      );

      const newSeqNum = await this.storage.commitDocAsClientUpdate(
        reqId,
        getSnapshot(merged),
        signal,
      );
      this.storage.eventBus.emit({
        type: 'ClientUpdateCommitted',
        seqNum: newSeqNum,
        docId: reqId,
        clientId: ID.unique(),
        update: {
          collectionName: 'request',
          data: merged,
          type: 'update',
        },
      });
    },
  };

  readonly actions = {
    addRequest: (req: FriendRequest) => {
      this.schedule({ type: 'load', docId: req.id });
      this.state.requests.set(req.id, req);
      this.statusUpdated$.next(req.id);
    },
  };

  constructor(private readonly storage: RequestStorageInner) {}

  async start(signal: AbortSignal) {
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        signal.throwIfAborted();
        const reqId = await this.state.jobQueue.asyncPop();
        const jobs = this.state.jobMap.get(reqId);

        this.state.jobMap.delete(reqId);

        if (!jobs) {
          // eslint-disable-next-line no-continue
          continue;
        }

        this.state.currentJob = { reqId, jobs };

        const { apply, load, save } = groupBy(jobs, (job) => job.type) as {
          [key in Job['type']]?: Job[];
        };

        if (load?.length) {
          await this.jobs.load(load[0] as any, signal);
        }

        for (const applyJob of apply ?? []) {
          await this.jobs.apply(applyJob as any, signal);
        }

        if (save?.length) {
          await this.jobs.save(reqId, save as any, signal);
        }

        this.state.currentJob = null;
        this.statusUpdated$.next(reqId);
      }
    } catch (error) {
      console.log('🚀 ~ LocalSyncEngine ~ start ~ error:', error);
    }
  }

  schedule(job: Job) {
    const priority = this.prioritySettings.get(job.docId) ?? 0;
    this.state.jobQueue.push(job.docId, priority);

    const existingJobs = this.state.jobMap.get(job.docId) ?? [];
    existingJobs.push(job);
    this.state.jobMap.set(job.docId, existingJobs);
    this.statusUpdated$.next(job.docId);
  }

  handleRequestUpdate(id: string, update: FriendRequest) {
    this.schedule({
      type: 'save',
      docId: id,
      update,
    });
  }
}
