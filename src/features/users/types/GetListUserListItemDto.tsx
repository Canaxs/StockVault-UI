import type { OperationClaimDto } from "./OperationClaimDto";

export type GetListUserListItemDto = {
  id: number;
  username: string;
  operationClaimDtos: OperationClaimDto[];
};
