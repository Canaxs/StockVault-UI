import { api } from "../../../api/api.tsx";
import type { CreatedProductStockResponse } from "../types/CreatedProductStockResponse.tsx";
import type { CreateProductStockRequest } from "../types/CreateProductStockRequest.tsx";

export const productStockApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AddProductStock: builder.mutation<
      CreatedProductStockResponse,
      CreateProductStockRequest
    >({
      query: (request) => ({
        url: "/ProductStock",
        method: "POST",
        body: request,
      }),
    }),
  }),
});

export const { useAddProductStockMutation } = productStockApi;
