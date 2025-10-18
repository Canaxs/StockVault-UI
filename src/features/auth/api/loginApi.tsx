import { api } from "../../../api/api.tsx";
import type { CreatedTokenResponse } from "../types/CreatedTokenResponse";
import type { CreateTokenRequest } from "../types/CreateTokenRequest.tsx";

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<CreatedTokenResponse, CreateTokenRequest>({
      query: (credentials) => ({
        url: "/Auth/Login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
