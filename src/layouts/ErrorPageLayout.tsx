import { Link } from "react-router-dom";

type ErrorPageLayoutProps = {
  headTitle?: string;
  title: string;
  message: string;
};

export const ErrorPageLayout = ({
  headTitle,
  title,
  message,
}: ErrorPageLayoutProps) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-200 w-full h-full flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 drop-shadow-md">
        {headTitle}
      </h1>
      <h1 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h1>
      <h2 className="text-gray-600 mb-4 text-center max-w-md leading-relaxed">
        {message}
      </h2>
      <Link
        to="/dashboard"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        Gösterge Paneli'ne dön
      </Link>
    </div>
  );
};
