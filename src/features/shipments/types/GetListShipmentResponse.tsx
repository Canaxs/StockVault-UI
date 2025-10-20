import type { GetListShipmentListItemDto } from "./GetListShipmentListItemDto";

export type GetListShipmentResponse = {
  items: GetListShipmentListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
