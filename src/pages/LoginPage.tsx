import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout, FormInput, GoogleButton } from "../components";
import { validateEmail, validatePassword } from "../utils/authValidation";
import { authService } from "../api/services/authService";
import { useAuth } from "../hooks/useAuth";
import type { ApiError, ValidationErrorPayload } from "../api/api";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password does not meet requirements";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      if (response.payload) {
        login(
          response.payload.access_token,
          response.payload.refresh_token,
          rememberMe
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      const apiError = error as ApiError;

      if (apiError.code === 401) {
        if (apiError.message.includes("not verified")) {
          setErrors((prev) => ({
            ...prev,
            general: "Please verify your email address first.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Invalid email or password.",
          }));
        }
      } else if (apiError.payload && typeof apiError.payload === "object") {
        const validationErrors = apiError.payload as ValidationErrorPayload;
        const backendErrors = { email: "", password: "", general: "" };

        if (validationErrors.email) {
          backendErrors.email = validationErrors.email;
        }
        if (validationErrors.password) {
          backendErrors.password = validationErrors.password;
        }

        setErrors((prev) => ({ ...prev, ...backendErrors }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: apiError.message || "Login failed. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = authService.getGoogleLoginUrl();
  };

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-6">
        <GoogleButton onClick={handleGoogleLogin} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errors.general}
          </div>
        )}

        <FormInput
          type="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          error={errors.email}
          required
        />

        <FormInput
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
