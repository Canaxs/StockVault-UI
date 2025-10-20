import type { GetListShipmentByWarehouseIdListItemDto } from "./GetListShipmentByWarehouseIdListItemDto";

export type GetListShipmentByWarehouseIdResponse = {
  items: GetListShipmentByWarehouseIdListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
