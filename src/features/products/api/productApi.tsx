import { api } from "../../../api/api.tsx";
import type { CreatedProductResponse } from "../types/CreatedProductResponse.tsx";
import type { CreateProductRequest } from "../types/CreateProductRequest.tsx";
import type { GetListProductRequest } from "../types/GetListProductRequest.tsx";
import type { GetListProductResponse } from "../types/GetListProductResponse.tsx";
import type { GetListTopSellingProductRequest } from "../types/GetListTopSellingProductRequest.tsx";
import type { GetListTopSellingProductResponse } from "../types/GetListTopSellingProductResponse.tsx";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getListProduct: builder.query<
      GetListProductResponse,
      GetListProductRequest
    >({
      query: (request) => ({
        url: "/Product",
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    GetListTopSellingProduct: builder.query<
      GetListTopSellingProductResponse,
      GetListTopSellingProductRequest
    >({
      query: (request) => {
        const params: any = {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        };

        if (request.StartDate) params.startDate = request.StartDate;
        if (request.EndDate) params.endDate = request.EndDate;

        return {
          url: "/Product/TopSellingProducts",
          method: "GET",
          params,
        };
      },
    }),
    AddProduct: builder.mutation<CreatedProductResponse, CreateProductRequest>({
      query: (request) => ({
        url: "/Product",
        method: "POST",
        body: request,
      }),
    }),
  }),
});

export const {
  useGetListProductQuery,
  useGetListTopSellingProductQuery,
  useAddProductMutation,
} = productApi;
