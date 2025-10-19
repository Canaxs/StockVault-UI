import { useAddProductMutation } from "../api/productApi.tsx";
import type { CreateProductRequest } from "../types/CreateProductRequest";
import type { CreatedProductResponse } from "../types/CreatedProductResponse";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const [addProduct, { isLoading, isSuccess, isError, error, data }] =
    useAddProductMutation();

  const createProduct = async (product: CreateProductRequest) => {
    try {
      const response: CreatedProductResponse = await addProduct(
        product
      ).unwrap();
      toast.success("Ürün başarıyla oluşturuldu!");
      return response;
    } catch (err: any) {
      toast.error("Ürün oluşturulurken bir hata oluştu!");
      console.error("createProduct error:", err);
      throw err;
    }
  };

  return {
    createProduct,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
