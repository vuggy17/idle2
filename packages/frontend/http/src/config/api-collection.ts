import { axiosClient } from '.';

export class APICollection {
  constructor(
    readonly collectionPrefix: string,
    readonly client = axiosClient,
  ) {}

  getUrl(path: string) {
    return `${this.collectionPrefix}/${path}`;
  }
}
