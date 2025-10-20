import { useAddUserMutation } from "../api/userApi.tsx";
import type { CreateUserRequest } from "../types/CreateUserRequest";
import type { CreatedUserResponse } from "../types/CreatedUserResponse";
import toast from "react-hot-toast";

export function useCreateUser() {
  const [AddUser, { isLoading, isSuccess, isError, error, data }] =
    useAddUserMutation();

  const createUser = async (user: CreateUserRequest) => {
    try {
      const response: CreatedUserResponse = await AddUser(user).unwrap();
      toast.success("Kullanıcı başarıyla oluşturuldu!");
      return response;
    } catch (err: any) {
      toast.error("Kullanıcı oluşturulurken bir hata oluştu!");
      console.error("createUser error:", err);
      throw err;
    }
  };

  return {
    createUser,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
