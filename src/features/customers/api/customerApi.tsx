import { api } from "../../../api/api.tsx";
import type { CreateCustomerRequest } from "../types/CreateCustomerRequest.tsx";
import type { CreatedCustomerResponse } from "../types/CreatedCustomerResponse.tsx";
import type { GetListCustomerRequest } from "../types/GetListCustomerRequest.tsx";
import type { GetListCustomerResponse } from "../types/GetListCustomerResponse.tsx";
import type { GetListProductByCustomerIdRequest } from "../types/GetListProductByCustomerIdRequest.tsx";
import type { GetListProductByCustomerIdResponse } from "../types/GetListProductByCustomerIdResponse.tsx";
import type { GetListShipmentByCustomerIdRequest } from "../types/GetListShipmentByCustomerIdRequest.tsx";
import type { GetListShipmentByCustomerIdResponse } from "../types/GetListShipmentByCustomerIdResponse.tsx";
import type { UpdateCustomerRequest } from "../types/UpdateCustomerRequest.tsx";
import type { UpdateCustomerResponse } from "../types/UpdateCustomerResponse.tsx";

export const customerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AddCustomer: builder.mutation<
      CreatedCustomerResponse,
      CreateCustomerRequest
    >({
      query: (request) => ({
        url: "/Customer",
        method: "POST",
        body: request,
      }),
    }),
    GetListCustomer: builder.query<
      GetListCustomerResponse,
      GetListCustomerRequest
    >({
      query: (request) => ({
        url: "/Customer",
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    GetListShipmentByCustomerId: builder.query<
      GetListShipmentByCustomerIdResponse,
      GetListShipmentByCustomerIdRequest
    >({
      query: (request) => ({
        url: `/Customer/${request.Id}/Shipments`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    GetListProductByCustomerId: builder.query<
      GetListProductByCustomerIdResponse,
      GetListProductByCustomerIdRequest
    >({
      query: (request) => ({
        url: `/Customer/${request.Id}/Products`,
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
    UpdateCustomer: builder.mutation<
      UpdateCustomerResponse,
      UpdateCustomerRequest
    >({
      query: (request) => ({
        url: "/Customer",
        method: "PUT",
        body: request,
      }),
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useGetListCustomerQuery,
  useGetListShipmentByCustomerIdQuery,
  useGetListProductByCustomerIdQuery,
  useUpdateCustomerMutation,
} = customerApi;
