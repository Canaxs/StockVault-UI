import { useDeleteWarehouseMutation } from "../api/warehouseApi.tsx";
import toast from "react-hot-toast";
import type { DeleteWarehouseRequest } from "../types/DeleteWarehouseRequest.tsx";
import type { DeletedWarehouseResponse } from "../types/DeletedWarehouseResponse.tsx";

export function useDeleteWarehouse() {
  const [DeleteWarehouse, { isLoading, isSuccess, isError, error, data }] =
    useDeleteWarehouseMutation();

  const deleteWarehouse = async (warehouse: DeleteWarehouseRequest) => {
    try {
      const response: DeletedWarehouseResponse = await DeleteWarehouse(
        warehouse
      ).unwrap();
      toast.success("Depo başarıyla Silindi!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("deleteWarehouse error:", err);
      throw err;
    }
  };

  return {
    deleteWarehouse,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
