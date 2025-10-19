import type { GetListProductListItemDto } from "./GetListProductListItemDto";

export type GetListProductResponse = {
  items: GetListProductListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
