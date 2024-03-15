/* eslint-disable max-classes-per-file */
import { Type } from '@nestjs/common';

import { PageInfo } from './page-info.model';

export default function Paginated<TItem>(TItemClass: Type<TItem>) {
  abstract class EdgeType {
    cursor: string;

    node: TItem;
  }

  abstract class PaginatedType {
    edges: Array<EdgeType>;

    // @Field((type) => [TItemClass], { nullable: true })
    // nodes: Array<TItem>;

    pageInfo: PageInfo;

    totalCount: number;
  }
  return PaginatedType;
}
