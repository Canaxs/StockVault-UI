import type { GetListByDynamicNameListItemDto } from "./GetListByDynamicNameListItemDto";

export type GetListByDynamicNameResponse = {
  items: GetListByDynamicNameListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
