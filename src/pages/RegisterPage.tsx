import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";
import GoogleButton from "../components/GoogleButton";
import {
  validateEmail,
  validatePassword,
  getPasswordErrors,
} from "../utils/authValidation";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
      isValid = false;
    }

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
      const passwordErrors = getPasswordErrors(formData.password);
      newErrors.password = passwordErrors[0];
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
      // TODO: Implement register API call
      console.log("Register data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth sign up
    console.log("Google sign up clicked");
    // Redirect to Google OAuth endpoint
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <AuthLayout title="Create Account" subtitle="Sign up to get started">
      <form onSubmit={handleSubmit} className="space-y-6">
        <GoogleButton onClick={handleGoogleSignUp} />

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

        <FormInput
          type="text"
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          error={errors.name}
          required
        />

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

        <div className="mb-4">
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

          <div className="mt-2 text-xs text-gray-600">
            <p className="font-medium mb-1">Password must contain:</p>
            <ul className="space-y-1">
              <li
                className={`flex items-center ${
                  formData.password.length >= 8
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <span className="mr-1">
                  {formData.password.length >= 8 ? "✓" : "○"}
                </span>
                At least 8 characters
              </li>
              <li
                className={`flex items-center ${
                  /[a-z]/.test(formData.password)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <span className="mr-1">
                  {/[a-z]/.test(formData.password) ? "✓" : "○"}
                </span>
                One lowercase letter
              </li>
              <li
                className={`flex items-center ${
                  /[A-Z]/.test(formData.password)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <span className="mr-1">
                  {/[A-Z]/.test(formData.password) ? "✓" : "○"}
                </span>
                One uppercase letter
              </li>
              <li
                className={`flex items-center ${
                  /\d/.test(formData.password)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <span className="mr-1">
                  {/\d/.test(formData.password) ? "✓" : "○"}
                </span>
                One number
              </li>
              <li
                className={`flex items-center ${
                  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <span className="mr-1">
                  {/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)
                    ? "✓"
                    : "○"}
                </span>
                One special character
              </li>
            </ul>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
