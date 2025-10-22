import { useDeleteProductMutation } from "../api/productApi.tsx";
import toast from "react-hot-toast";
import type { DeleteProductRequest } from "../types/DeleteProductRequest.tsx";
import type { DeletedProductResponse } from "../types/DeletedProductResponse.tsx";

export function useDeleteProduct() {
  const [DeleteProduct, { isLoading, isSuccess, isError, error, data }] =
    useDeleteProductMutation();

  const deleteProduct = async (product: DeleteProductRequest) => {
    try {
      const response: DeletedProductResponse = await DeleteProduct(
        product
      ).unwrap();
      toast.success("Ürün başarıyla Silindi!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("deleteProduct error:", err);
      throw err;
    }
  };

  return {
    deleteProduct,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
