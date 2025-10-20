import type { GetListProductByWarehouseIdListItemDto } from "./GetListProductByWarehouseIdListItemDto";

export type GetListProductByWarehouseIdResponse = {
  items: GetListProductByWarehouseIdListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
