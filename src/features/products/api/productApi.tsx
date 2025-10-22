import { api } from "../../../api/api.tsx";
import type { CreatedProductResponse } from "../types/CreatedProductResponse.tsx";
import type { CreateProductRequest } from "../types/CreateProductRequest.tsx";
import type { DeletedProductResponse } from "../types/DeletedProductResponse.tsx";
import type { DeleteProductRequest } from "../types/DeleteProductRequest.tsx";
import type { GetListByDynamicNameRequest } from "../types/GetListByDynamicNameRequest.tsx";
import type { GetListByDynamicNameResponse } from "../types/GetListByDynamicNameResponse.tsx";
import type { GetListCustomerByProductIdRequest } from "../types/GetListCustomerByProductIdRequest.tsx";
import type { GetListCustomerByProductIdResponse } from "../types/GetListCustomerByProductIdResponse.tsx";
import type { GetListProductRequest } from "../types/GetListProductRequest.tsx";
import type { GetListProductResponse } from "../types/GetListProductResponse.tsx";
import type { GetListShipmentByProductIdRequest } from "../types/GetListShipmentByProductIdRequest.tsx";
import type { GetListShipmentByProductIdResponse } from "../types/GetListShipmentByProductIdResponse.tsx";
import type { GetListTopSellingProductRequest } from "../types/GetListTopSellingProductRequest.tsx";
import type { GetListTopSellingProductResponse } from "../types/GetListTopSellingProductResponse.tsx";
import type { GetListWarehouseByProductIdRequest } from "../types/GetListWarehouseByProductIdRequest.tsx";
import type { GetListWarehouseByProductIdResponse } from "../types/GetListWarehouseByProductIdResponse.tsx";
import type { UpdatedProductResponse } from "../types/UpdatedProductResponse.tsx";
import type { UpdateProductRequest } from "../types/UpdateProductRequest.tsx";

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
    GetListWarehouseByProductId: builder.query<
      GetListWarehouseByProductIdResponse,
      GetListWarehouseByProductIdRequest
    >({
      query: (request) => ({
        url: `/Product/${request.Id}/Warehouse`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    GetListShipmentByProductId: builder.query<
      GetListShipmentByProductIdResponse,
      GetListShipmentByProductIdRequest
    >({
      query: (request) => ({
        url: `/Product/${request.Id}/Shipments`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    GetListCustomerByProductId: builder.query<
      GetListCustomerByProductIdResponse,
      GetListCustomerByProductIdRequest
    >({
      query: (request) => ({
        url: `/Product/${request.Id}/Customers`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    UpdateProduct: builder.mutation<
      UpdatedProductResponse,
      UpdateProductRequest
    >({
      query: (request) => ({
        url: "/Product",
        method: "PUT",
        body: request,
      }),
    }),
    GetListByDynamicName: builder.query<
      GetListByDynamicNameResponse,
      GetListByDynamicNameRequest
    >({
      query: (request) => ({
        url: `/Product/DynamicName`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
          fieldValue: request.FieldValue,
          fieldOperator: request.FieldOperator,
          sortField: request.SortField,
          sortDir: request.SortDir,
        },
      }),
    }),
    DeleteProduct: builder.mutation<
      DeletedProductResponse,
      DeleteProductRequest
    >({
      query: (request) => ({
        url: `/Product/${request.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListProductQuery,
  useGetListTopSellingProductQuery,
  useAddProductMutation,
  useGetListWarehouseByProductIdQuery,
  useGetListShipmentByProductIdQuery,
  useGetListCustomerByProductIdQuery,
  useUpdateProductMutation,
  useGetListByDynamicNameQuery,
  useDeleteProductMutation,
} = productApi;
