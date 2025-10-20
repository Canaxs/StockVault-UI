import { api } from "../../../api/api.tsx";
import type { CreatedTokenResponse } from "../types/CreatedTokenResponse";
import type { CreateTokenRequest } from "../types/CreateTokenRequest.tsx";
import type { GetByClaimsResponse } from "../types/GetByClaimsResponse.tsx";

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<CreatedTokenResponse, CreateTokenRequest>({
      query: (credentials) => ({
        url: "/Auth/Login",
        method: "POST",
        body: credentials,
      }),
    }),
    GetClaims: builder.query<GetByClaimsResponse, void>({
      query: () => ({
        url: "/Auth/Claims",
        method: "Get",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetClaimsQuery } = loginApi;
