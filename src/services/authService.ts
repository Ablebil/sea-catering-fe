import { apiService } from "./api";
import type { ApiResponse } from "./api";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

class AuthService {
  async register(data: RegisterRequest): Promise<ApiResponse> {
    return apiService.post("/auth/register", data);
  }

  async verifyOTP(data: VerifyOTPRequest): Promise<ApiResponse<TokenResponse>> {
    return apiService.post("/auth/verify-otp", data);
  }

  async login(data: LoginRequest): Promise<ApiResponse<TokenResponse>> {
    return apiService.post("/auth/login", data);
  }

  async refreshToken(
    data: RefreshTokenRequest
  ): Promise<ApiResponse<TokenResponse>> {
    return apiService.post("/auth/refresh-token", data);
  }

  async logout(data: LogoutRequest): Promise<ApiResponse> {
    return apiService.post("/auth/logout", data);
  }

  getGoogleLoginUrl(): string {
    return `${import.meta.env.VITE_API_URL}/auth/google`;
  }
}

export const authService = new AuthService();
