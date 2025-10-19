import type { GetListShipmentByProductIdListItemDto } from "./GetListShipmentByProductIdListItemDto";

export type GetListShipmentByProductIdResponse = {
  items: GetListShipmentByProductIdListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
