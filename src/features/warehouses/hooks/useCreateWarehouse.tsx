import { useAddWarehouseMutation } from "../api/warehouseApi.tsx";
import type { CreateWarehouseRequest } from "../types/CreateWarehouseRequest.tsx";
import type { CreatedWarehouseResponse } from "../types/CreatedWarehouseResponse.tsx";
import toast from "react-hot-toast";

export function useCreateWarehouse() {
  const [AddWarehouse, { isLoading, isSuccess, isError, error, data }] =
    useAddWarehouseMutation();

  const createWarehouse = async (warehouse: CreateWarehouseRequest) => {
    try {
      const response: CreatedWarehouseResponse = await AddWarehouse(
        warehouse
      ).unwrap();
      toast.success("Depo başarıyla oluşturuldu!");
      return response;
    } catch (err: any) {
      toast.error("Depo oluşturulurken bir hata oluştu!");
      console.error("createWarehouse error:", err);
      throw err;
    }
  };

  return {
    createWarehouse,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
