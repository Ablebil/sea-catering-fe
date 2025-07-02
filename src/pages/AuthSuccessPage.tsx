import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
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

    if (!hasLoggedIn) {
      login(accessToken, refreshToken, false);
      setHasLoggedIn(true);
    }
  }, [searchParams, navigate, login, hasLoggedIn]);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

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
