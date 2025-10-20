import { api } from "../../../api/api.tsx";
import type { CreatedShipmentResponse } from "../types/CreatedShipmentResponse.tsx";
import type { CreateShipmentRequest } from "../types/CreateShipmentRequest.tsx";
import type { GetListShipmentRequest } from "../types/GetListShipmentRequest.tsx";
import type { GetListShipmentResponse } from "../types/GetListShipmentResponse.tsx";

export const shipmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AddShipment: builder.mutation<
      CreatedShipmentResponse,
      CreateShipmentRequest
    >({
      query: (request) => ({
        url: "/Shipment",
        method: "POST",
        body: request,
      }),
    }),
    GetListShipment: builder.query<
      GetListShipmentResponse,
      GetListShipmentRequest
    >({
      query: (request) => ({
        url: "/Shipment",
        method: "GET",
        params: {
          PageIndex: request.PageIndex,
          PageSize: request.PageSize,
        },
      }),
    }),
  }),
});

export const { useAddShipmentMutation, useGetListShipmentQuery } = shipmentApi;
