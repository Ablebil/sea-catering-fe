import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components";
import { getUserFromToken } from "../utils/jwtUtils";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthSuccess = () => {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError("Authentication failed. Please try again.");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
        return;
      }

      if (!accessToken || !refreshToken) {
        setError("Invalid authentication response. Please try again.");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
        return;
      }

      try {
        login(accessToken, refreshToken, false);

        const userFromToken = getUserFromToken();

        setTimeout(() => {
          if (userFromToken?.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        }, 2000);
      } catch (error) {
        console.error("Login error:", error);
        setError("Failed to complete login. Please try again.");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      }
    };

    handleAuthSuccess();
  }, [searchParams, navigate, login]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner text="Redirecting to dashboard..." />
    </div>
  );
};

export default AuthSuccessPage;
