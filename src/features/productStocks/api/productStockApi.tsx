import { api } from "../../../api/api.tsx";
import type { CreatedProductStockResponse } from "../types/CreatedProductStockResponse.tsx";
import type { CreateProductStockRequest } from "../types/CreateProductStockRequest.tsx";
import type { GetProductStockByProductIdAndWarehouseIdRequest } from "../types/GetProductStockByProductIdAndWarehouseIdRequest.tsx";
import type { GetProductStockByProductIdAndWarehouseIdResponse } from "../types/GetProductStockByProductIdAndWarehouseIdResponse.tsx";
import type { UpdatedProductStockResponse } from "../types/UpdatedProductStockResponse.tsx";
import type { UpdateProductStockRequest } from "../types/UpdateProductStockRequest.tsx";

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
    GetProductStockByProductIdAndWarehouseId: builder.query<
      GetProductStockByProductIdAndWarehouseIdResponse,
      GetProductStockByProductIdAndWarehouseIdRequest
    >({
      query: (request) => ({
        url: `/ProductStock/Product/${request.productId}/Warehouse/${request.warehouseId}`,
        method: "GET",
      }),
    }),
    UpdateProductStock: builder.mutation<
      UpdatedProductStockResponse,
      UpdateProductStockRequest
    >({
      query: (request) => ({
        url: "/ProductStock",
        method: "PUT",
        body: request,
      }),
    }),
  }),
});

export const {
  useAddProductStockMutation,
  useGetProductStockByProductIdAndWarehouseIdQuery,
  useLazyGetProductStockByProductIdAndWarehouseIdQuery,
  useUpdateProductStockMutation,
} = productStockApi;
