import { useState } from "react";
import { TextInput } from "../../../components/Form/TextInput";
import { Button } from "../../../components/Form/Button";
import { useLoginUser } from "../hooks/useLoginUser";

export const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLogin, isLoading } = useLoginUser();

  const onSubmit = async () => {
    await handleLogin(username, password);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-10 p-6 sm:p-8 md:p-10 shadow-2xl rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50">
      <div className="flex flex-col space-y-1 mb-6 items-center">
        <h2 className="tracking-tight text-2xl font-medium ">Giriş Yap</h2>
        <h4 className="tracking-tight text-sm text-shadow-md">
          Kullanıcı adı ve şifrenizi giriniz
        </h4>
      </div>

      <div className="flex flex-col space-y-4">
        <TextInput
          label="Kullanıcı Adı"
          value={username}
          inputClassName="h-10 p-3 shadow-md"
          onChange={(val) => setUsername(val)}
          placeholder="Kullanıcı Adı"
        />

        <TextInput
          label="Şifre"
          value={password}
          inputClassName="h-10 p-3 shadow-md"
          type="password"
          onChange={(val) => setPassword(val)}
          placeholder="Şifre"
        />

        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="secondary"
          className="mt-5"
        >
          Giriş yap
        </Button>
      </div>
    </div>
  );
};
