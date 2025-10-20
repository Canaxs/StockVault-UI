import type { GetListCustomerListItemDto } from "./GetListCustomerListItemDto";

export type GetListCustomerResponse = {
  items: GetListCustomerListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
