import { useUpdateShipmentMutation } from "../api/shipmentApi.tsx";
import toast from "react-hot-toast";
import type { UpdateShipmentRequest } from "../types/UpdateShipmentRequest.tsx";
import type { UpdatedShipmentResponse } from "../types/UpdatedShipmentResponse.tsx";

export function useUpdateShipment() {
  const [UpdateShipment, { isLoading, isSuccess, isError, error, data }] =
    useUpdateShipmentMutation();

  const updateShipment = async (shipment: UpdateShipmentRequest) => {
    try {
      const response: UpdatedShipmentResponse = await UpdateShipment(
        shipment
      ).unwrap();
      toast.success("Sevkiyat bilgisi başarıyla Güncellendi!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("updateShipmenterror:", err);
      throw err;
    }
  };

  return {
    updateShipment,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
