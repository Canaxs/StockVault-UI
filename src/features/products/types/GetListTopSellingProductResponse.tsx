import type { GetListTopSellingProductListItemDto } from "./GetListTopSellingProductListItemDto";

export type GetListTopSellingProductResponse = {
  items: GetListTopSellingProductListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
