import toast from "react-hot-toast";
import { useLoginMutation } from "../api/loginApi";

export const useLoginUser = () => {
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      toast.error("Kullanıcı adı ve şifre gereklidir.");
      return;
    }

    try {
      const response = await login({ username, password }).unwrap();

      toast.success("Giriş Başarılı !");
      return response;
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Kullanıcı adı veya şifre yanlış. Tekrar deneyin."
      );
      throw err;
    }
  };

  return { handleLogin, isLoading };
};
