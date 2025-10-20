import { api } from "../../../api/api.tsx";
import type { CreatedUserResponse } from "../types/CreatedUserResponse.tsx";
import type { CreateUserRequest } from "../types/CreateUserRequest.tsx";
import type { GetListUserRequest } from "../types/GetListUserRequest.tsx";
import type { GetListUserResponse } from "../types/GetListUserResponse.tsx";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AddUser: builder.mutation<CreatedUserResponse, CreateUserRequest>({
      query: (credentials) => ({
        url: "/User",
        method: "POST",
        body: credentials,
      }),
    }),

    GetListUser: builder.query<GetListUserResponse, GetListUserRequest>({
      query: (request) => ({
        url: "/User",
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
  }),
});

export const { useAddUserMutation, useGetListUserQuery } = userApi;
