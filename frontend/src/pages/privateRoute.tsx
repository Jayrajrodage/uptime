import Loader from "@/components/ui/loader";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  return !isLoaded ? (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  ) : isSignedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default PrivateRoute;
