import toast from "react-hot-toast";
import type { CreatedProductStockResponse } from "../types/CreatedProductStockResponse.tsx";
import { useAddProductStockMutation } from "../api/productStockApi.tsx";
import type { CreateProductStockRequest } from "../types/CreateProductStockRequest.tsx";

export function useCreateProductStock() {
  const [AddProductStock, { isLoading, isSuccess, isError, error, data }] =
    useAddProductStockMutation();

  const createProductStock = async (
    productStock: CreateProductStockRequest
  ) => {
    try {
      const response: CreatedProductStockResponse = await AddProductStock(
        productStock
      ).unwrap();
      toast.success("Ürün Stoğu başarıyla oluşturuldu!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("createProductStock error:", err);
      throw err;
    }
  };

  return {
    createProductStock,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
