import type { GetListWarehouseListItemDto } from "./GetListWarehouseListItemDto";

export type GetListWarehouseResponse = {
  items: GetListWarehouseListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
