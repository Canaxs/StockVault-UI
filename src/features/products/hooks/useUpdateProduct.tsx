import { useUpdateProductMutation } from "../api/productApi.tsx";
import toast from "react-hot-toast";
import type { UpdateProductRequest } from "../types/UpdateProductRequest.tsx";
import type { UpdatedProductResponse } from "../types/UpdatedProductResponse.tsx";

export function useUpdateProduct() {
  const [UpdateProduct, { isLoading, isSuccess, isError, error, data }] =
    useUpdateProductMutation();

  const updateProduct = async (product: UpdateProductRequest) => {
    try {
      const response: UpdatedProductResponse = await UpdateProduct(
        product
      ).unwrap();
      toast.success("Ürün başarıyla Güncellendi!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("updateProducterror:", err);
      throw err;
    }
  };

  return {
    updateProduct,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
