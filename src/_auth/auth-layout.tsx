import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <section className="flex flex-1 items-center justify-center px-2">
            <Outlet />
          </section>
          <div className="hidden h-screen w-1/2 bg-stone-600 bg-no-repeat object-cover xl:block"></div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
