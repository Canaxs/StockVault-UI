import { LoginForm } from "../../components/LoginForm";

export function Login() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-white to-gray-200 max-sm:to-gray-100">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col items-center text-center space-y-1">
          <img
            src="depo-logo.png"
            width={75}
            height={75}
            className="object-fill"
          />
          <p className="font-medium text-base text-shadow-xs text-gray-800">
            StockVault
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
