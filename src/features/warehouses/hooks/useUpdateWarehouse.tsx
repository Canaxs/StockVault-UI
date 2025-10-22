import { useUpdateWarehouseMutation } from "../api/warehouseApi.tsx";
import toast from "react-hot-toast";
import type { UpdateWarehouseRequest } from "../types/UpdateWarehouseRequest.tsx";
import type { UpdateWarehouseResponse } from "../types/UpdateWarehouseResponse.tsx";

export function useUpdateWarehouse() {
  const [UpdateWarehouse, { isLoading, isSuccess, isError, error, data }] =
    useUpdateWarehouseMutation();

  const updateWarehouse = async (warehouse: UpdateWarehouseRequest) => {
    try {
      const response: UpdateWarehouseResponse = await UpdateWarehouse(
        warehouse
      ).unwrap();
      toast.success("Depo başarıyla Güncellendi!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("updateWarehouse error:", err);
      throw err;
    }
  };

  return {
    updateWarehouse,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
