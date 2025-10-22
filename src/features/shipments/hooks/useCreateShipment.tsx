import { useAddShipmentMutation } from "../api/shipmentApi.tsx";
import type { CreateShipmentRequest } from "../types/CreateShipmentRequest.tsx";
import type { CreatedShipmentResponse } from "../types/CreatedShipmentResponse.tsx";
import toast from "react-hot-toast";

export function useCreateShipment() {
  const [AddShipment, { isLoading, isSuccess, isError, error, data }] =
    useAddShipmentMutation();

  const createShipment = async (shipment: CreateShipmentRequest) => {
    try {
      const response: CreatedShipmentResponse = await AddShipment(
        shipment
      ).unwrap();
      toast.success("Sipariş başarıyla oluşturuldu!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("createShipment error:", err);
      throw err;
    }
  };

  return {
    createShipment,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
