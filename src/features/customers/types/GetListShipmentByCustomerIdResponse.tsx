import type { GetListShipmentByCustomerIdListItemDto } from "./GetListShipmentByCustomerIdListItemDto";

export type GetListShipmentByCustomerIdResponse = {
  items: GetListShipmentByCustomerIdListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
