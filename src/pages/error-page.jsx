import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">¡Oops!</h1>
        <p className="text-xl text-gray-800 mb-4">Lo sentimos, ha ocurrido un error inesperado.</p>
        <p className="italic text-gray-600 text-lg font-semibold">{error?.statusText || error?.message}</p>
      </div>
    </div>
  );
}