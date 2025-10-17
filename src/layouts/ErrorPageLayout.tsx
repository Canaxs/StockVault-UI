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
    <>
      <h1>{headTitle}</h1>
      <h1>{title}</h1>
      <h2 className="lead">{message}</h2>
      <Link to="/" className="btn btn-link p-0 mb-2 mt-3">
        Go back to home
      </Link>
    </>
  );
};
