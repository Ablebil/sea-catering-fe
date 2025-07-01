import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthLayout, FormInput } from "../components";
import { authService } from "../api/services/authService";
import { useAuth } from "../hooks/useAuth";
import { getUserFromToken } from "../utils/jwtUtils";
import type { ApiError } from "../api/api";

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (!emailFromState) {
      navigate("/register");
      return;
    }
    setEmail(emailFromState);
  }, [location.state, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.verifyOTP({
        email,
        otp: otp.trim(),
      });

      if (response.payload) {
        login(
          response.payload.access_token,
          response.payload.refresh_token,
          false
        );

        setTimeout(() => {
          const userFromToken = getUserFromToken();

          if (userFromToken?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 100);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      const apiError = error as ApiError;
      setError(apiError.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={`We've sent a 6-digit code to ${email}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          type="text"
          name="otp"
          label="OTP Code"
          value={otp}
          onChange={handleInputChange}
          placeholder="Enter 6-digit code"
          error={error}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-green-600 hover:text-green-700 font-medium"
              onClick={() => navigate("/register")}
            >
              Try again
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyOTPPage;
