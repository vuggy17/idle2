import { Subject } from 'rxjs';
import { FriendRequest } from '../data/domain/friend-request';
import { AsyncPriorityQueue } from './async-priority-queue';
import type { SyncEvent } from './event';
import type { DocStorageInner } from './storage';
import { Unreachable } from '@idle/env/constant';
import { groupBy } from 'lodash-es';
import { throwIfAborted } from '../utils';

type Job =
  | {
      type: 'load';
      docId: string;
    }
  | {
      type: 'save';
      docId: string;
      update: SyncEvent['update'];
    }
  | {
      type: 'apply';
      docId: string;
      update: SyncEvent['update'];
      isInitialize: boolean;
    };

export class LocalSyncPeer {
  private readonly statusUpdatedSubject$ = new Subject<string>();

  private readonly status = {
    requests: new Array<FriendRequest>(),
    // docs: new Map<string, YDoc>(),
    // connectedDocs: new Set<string>(),
    // readyDocs: new Set<string>(),
    jobDocQueue: new AsyncPriorityQueue(),
    jobMap: new Map<string, Job[]>(),
    currentJob: null as { docId: string; jobs: Job[] } | null,
  };

  constructor(
    private readonly clientId: string,
    private readonly storage: DocStorageInner<FriendRequest>,
  ) {}

  readonly events: {
    [key in SyncEvent['type']]?: (event: SyncEvent & { type: key }) => void;
  } = {
    ServerUpdateCommitted: ({ docId, update, clientId }) => {
      this.schedule({
        type: 'apply',
        docId,
        update,
        isInitialize: clientId === this.clientId,
      });
    },
    ClientUpdateCommitted: ({ docId, update, clientId }) => {
      if (clientId !== this.clientId) {
        this.schedule({
          type: 'apply',
          docId,
          update,
          isInitialize: false,
        });
      }
    },
  };

  readonly jobs = {
    loadFriendRequest: async (
      job: Job & { type: 'load' },
      signal?: AbortSignal,
    ) => {
      const existingData = this.status.requests;

      if (existingData.length > 0) {
        // this.schedule({
        //   type: 'save',
        //   docId: doc.guid,
        //   update: existingData,
        // });
      }
      const data = await this.storage.loadDocsFromLocal(
        ['friend-requests'],
        signal,
      );
      if (data.length === 0) return;
      this.status.requests = data;
    },
    load: async (job: Job & { type: 'load' }, signal?: AbortSignal) => {
      const doc = this.status.docs.get(job.docId);
      if (!doc) {
        throw new Unreachable('doc not found');
      }
      const existingData = encodeStateAsUpdate(doc);

      if (!isEmptyUpdate(existingData)) {
        this.schedule({
          type: 'save',
          docId: doc.guid,
          update: existingData,
        });
      }

      // mark doc as loaded
      doc.emit('sync', [true, doc]);
      doc.on('update', this.handleDocUpdate);

      this.status.connectedDocs.add(job.docId);
      this.statusUpdatedSubject$.next(job.docId);

      const docData = await this.storage.loadDocFromLocal(job.docId, signal);

      if (!docData || isEmptyUpdate(docData)) {
        return;
      }

      this.applyUpdate(job.docId, docData);
      this.status.readyDocs.add(job.docId);
      this.statusUpdatedSubject$.next(job.docId);
    },
    save: async (
      docId: string,
      jobs: (Job & { type: 'save' })[],
      signal?: AbortSignal,
    ) => {
      if (this.status.connectedDocs.has(docId)) {
        const merged = mergeUpdates(
          jobs.map((j) => j.update).filter((update) => !isEmptyUpdate(update)),
        );
        const newSeqNum = await this.storage.commitDocAsClientUpdate(
          docId,
          merged,
          signal,
        );
        this.storage.eventBus.emit({
          type: 'ClientUpdateCommitted',
          seqNum: newSeqNum,
          docId: docId,
          clientId: this.clientId,
          update: {
            collectionName: 'request',
            data: jobs.map((j) => j.update.data) as any,
            type: 'add',
          },
        });
      }
    },
    apply: async (job: Job & { type: 'apply' }, signal?: AbortSignal) => {
      throwIfAborted(signal);
      if (this.status.connectedDocs.has(job.docId)) {
        this.applyUpdate(job.docId, job.update);
      }
      if (job.isInitialize && !isEmptyUpdate(job.update)) {
        this.status.readyDocs.add(job.docId);
        this.statusUpdatedSubject$.next(job.docId);
      }
    },
  };

  handleDocUpdate = (update: SyncEvent['update'], origin: any, doc: YDoc) => {
    // if (origin === DOC_ENGINE_ORIGIN) {
    //   return;
    // }

    this.schedule({
      type: 'save',
      docId: doc.guid,
      update,
    });
  };

  schedule(job: Job) {
    // const priority = this.prioritySettings.get(job.docId) ?? 0;
    // this.status.jobDocQueue.push(job.docId, priority);
    // const existingJobs = this.status.jobMap.get(job.docId) ?? [];
    // existingJobs.push(job);
    // this.status.jobMap.set(job.docId, existingJobs);
    // this.statusUpdatedSubject$.next(job.docId);
  }

  async mainLoop(signal?: AbortSignal) {
    const dispose = this.storage.eventBus.on((event) => {
      const handler = this.events[event.type];
      if (handler) {
        handler(event as any);
      }
    });

    try {
      while (true) {
        throwIfAborted(signal);
        const docId = await this.status.jobDocQueue.asyncPop(signal);
        const jobs = this.status.jobMap.get(docId);
        this.status.jobMap.delete(docId);

        if (!jobs) {
          continue;
        }

        this.status.currentJob = { docId, jobs };
        this.statusUpdatedSubject$.next(docId);

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
          await this.jobs.save(docId, save as any, signal);
        }

        this.status.currentJob = null;
        this.statusUpdatedSubject$.next(docId);
      }
    } catch (error) {
    } finally {
      dispose();
    }
  }
}
