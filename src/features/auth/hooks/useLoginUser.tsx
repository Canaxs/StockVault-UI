import toast from "react-hot-toast";
import { useLoginMutation, loginApi } from "../api/loginApi";
import { useAppDispatch } from "../../../app/hooks";

export const useLoginUser = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      toast.error("Kullanıcı adı ve şifre gereklidir.");
      return;
    }

    let loginResponse;
    let claimsResponse;

    try {
      loginResponse = await login({ username, password }).unwrap();
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Kullanıcı adı veya şifre yanlış. Tekrar deneyin."
      );
      throw err;
    }

    try {
      claimsResponse = await dispatch(
        loginApi.endpoints.GetClaims.initiate()
      ).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || "Rol bilgileri alınamadı.");
    }
    return { loginResponse, claimsResponse };
  };

  return { handleLogin, isLoading };
};
