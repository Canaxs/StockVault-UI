import { api } from "../../../api/api.tsx";
import type { CreatedWarehouseResponse } from "../types/CreatedWarehouseResponse.tsx";
import type { CreateWarehouseRequest } from "../types/CreateWarehouseRequest.tsx";
import type { DeletedWarehouseResponse } from "../types/DeletedWarehouseResponse.tsx";
import type { DeleteWarehouseRequest } from "../types/DeleteWarehouseRequest.tsx";
import type { GetListProductByWarehouseIdRequest } from "../types/GetListProductByWarehouseIdRequest.tsx";
import type { GetListProductByWarehouseIdResponse } from "../types/GetListProductByWarehouseIdResponse.tsx";
import type { GetListShipmentByWarehouseIdRequest } from "../types/GetListShipmentByWarehouseIdRequest.tsx";
import type { GetListShipmentByWarehouseIdResponse } from "../types/GetListShipmentByWarehouseIdResponse.tsx";
import type { GetListWarehouseRequest } from "../types/GetListWarehouseRequest.tsx";
import type { GetListWarehouseResponse } from "../types/GetListWarehouseResponse.tsx";
import type { UpdateWarehouseRequest } from "../types/UpdateWarehouseRequest.tsx";
import type { UpdateWarehouseResponse } from "../types/UpdateWarehouseResponse.tsx";

export const warehouseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AddWarehouse: builder.mutation<
      CreatedWarehouseResponse,
      CreateWarehouseRequest
    >({
      query: (request) => ({
        url: "/Warehouse",
        method: "POST",
        body: request,
      }),
    }),
    GetListWarehouse: builder.query<
      GetListWarehouseResponse,
      GetListWarehouseRequest
    >({
      query: (request) => ({
        url: "/Warehouse",
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    GetListProductByWarehouseId: builder.query<
      GetListProductByWarehouseIdResponse,
      GetListProductByWarehouseIdRequest
    >({
      query: (request) => ({
        url: `/Warehouse/${request.Id}/Products`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    GetListShipmentByWarehouseId: builder.query<
      GetListShipmentByWarehouseIdResponse,
      GetListShipmentByWarehouseIdRequest
    >({
      query: (request) => ({
        url: `/Warehouse/${request.Id}/Shipments`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    UpdateWarehouse: builder.mutation<
      UpdateWarehouseResponse,
      UpdateWarehouseRequest
    >({
      query: (request) => ({
        url: "/Warehouse",
        method: "PUT",
        body: request,
      }),
    }),
    DeleteWarehouse: builder.mutation<
      DeletedWarehouseResponse,
      DeleteWarehouseRequest
    >({
      query: (request) => ({
        url: `/Warehouse/${request.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddWarehouseMutation,
  useGetListWarehouseQuery,
  useGetListProductByWarehouseIdQuery,
  useGetListShipmentByWarehouseIdQuery,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;
