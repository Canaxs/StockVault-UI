import type { GetListCustomerByProductIdListItemDto } from "./GetListCustomerByProductIdListItemDto";

export type GetListCustomerByProductIdResponse = {
  items: GetListCustomerByProductIdListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
