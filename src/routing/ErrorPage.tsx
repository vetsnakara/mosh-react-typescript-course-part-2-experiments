import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <h1>Oops...</h1>
      <p>
        {isRouteErrorResponse(error) ? "Not Found Page" : "Unexpected error"}
      </p>
    </>
  );
};

export default ErrorPage;
