import type { GetListWarehouseByProductIdListItemDto } from "./GetListWarehouseByProductIdListItemDto";

export type GetListWarehouseByProductIdResponse = {
  items: GetListWarehouseByProductIdListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
