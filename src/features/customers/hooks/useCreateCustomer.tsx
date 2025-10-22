import toast from "react-hot-toast";
import type { CreatedCustomerResponse } from "../types/CreatedCustomerResponse";
import type { CreateCustomerRequest } from "../types/CreateCustomerRequest";
import { useAddCustomerMutation } from "../api/customerApi";

export function useCreateCustomer() {
  const [AddCustomer, { isLoading, isSuccess, isError, error, data }] =
    useAddCustomerMutation();

  const createCustomer = async (customer: CreateCustomerRequest) => {
    try {
      const response: CreatedCustomerResponse = await AddCustomer(
        customer
      ).unwrap();
      toast.success("Müşteri başarıyla oluşturuldu!");
      return response;
    } catch (err: any) {
      toast.error(err?.data?.detail || "Bir hata oluştu");
      console.error("createCustomer error:", err);
      throw err;
    }
  };

  return {
    createCustomer,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
