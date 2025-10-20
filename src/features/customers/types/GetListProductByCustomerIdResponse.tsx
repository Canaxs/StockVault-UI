import type { GetListProductByCustomerIdListItemDto } from "./GetListProductByCustomerIdListItemDto";

export type GetListProductByCustomerIdResponse = {
  items: GetListProductByCustomerIdListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
