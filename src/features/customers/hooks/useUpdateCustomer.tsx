import { useUpdateCustomerMutation } from "../api/customerApi.tsx";
import toast from "react-hot-toast";
import type { UpdateCustomerRequest } from "../types/UpdateCustomerRequest.tsx";
import type { UpdateCustomerResponse } from "../types/UpdateCustomerResponse.tsx";

export function useUpdateCustomer() {
  const [UpdateCustomer, { isLoading, isSuccess, isError, error, data }] =
    useUpdateCustomerMutation();

  const updateCustomer = async (customer: UpdateCustomerRequest) => {
    try {
      const response: UpdateCustomerResponse = await UpdateCustomer(
        customer
      ).unwrap();
      toast.success("Müşteri bilgileri başarıyla Güncellendi!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("updateCustomer error:", err);
      throw err;
    }
  };

  return {
    updateCustomer,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
