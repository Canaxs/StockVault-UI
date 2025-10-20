import type { GetListUserListItemDto } from "./GetListUserListItemDto";

export type GetListUserResponse = {
  items: GetListUserListItemDto[];
  size: number;
  index: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};
