import { useUpdateProductStockMutation } from "../api/productStockApi.tsx";
import toast from "react-hot-toast";
import type { UpdateProductStockRequest } from "../types/UpdateProductStockRequest.tsx";
import type { UpdatedProductStockResponse } from "../types/UpdatedProductStockResponse.tsx";

export function useUpdateProductStock() {
  const [UpdateProductStock, { isLoading, isSuccess, isError, error, data }] =
    useUpdateProductStockMutation();

  const updateProductStock = async (
    productStock: UpdateProductStockRequest
  ) => {
    try {
      const response: UpdatedProductStockResponse = await UpdateProductStock(
        productStock
      ).unwrap();
      toast.success("Ürün Stoğu başarıyla Güncellendi!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("updateProductStockerror:", err);
      throw err;
    }
  };

  return {
    updateProductStock,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
