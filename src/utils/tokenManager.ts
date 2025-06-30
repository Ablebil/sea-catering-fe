import { apiService } from "../api/api";

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

class TokenManager {
  private readonly ACCESS_TOKEN_KEY = "sea_catering_access_token";
  private readonly REFRESH_TOKEN_KEY = "sea_catering_refresh_token";

  setTokens(
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean = false
  ): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    storage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);

    const otherStorage = rememberMe ? sessionStorage : localStorage;
    otherStorage.removeItem(this.ACCESS_TOKEN_KEY);
    otherStorage.removeItem(this.REFRESH_TOKEN_KEY);

    apiService.setAuthToken(accessToken);
  }

  getAccessToken(): string | null {
    return (
      localStorage.getItem(this.ACCESS_TOKEN_KEY) ||
      sessionStorage.getItem(this.ACCESS_TOKEN_KEY)
    );
  }

  getRefreshToken(): string | null {
    return (
      localStorage.getItem(this.REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(this.REFRESH_TOKEN_KEY)
    );
  }

  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);

    apiService.removeAuthToken();
  }

  hasValidTokens(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    return !!(accessToken && refreshToken);
  }

  initializeTokens(): void {
    const token = this.getAccessToken();
    if (token) {
      apiService.setAuthToken(token);
    }
  }

  isRemembered(): boolean {
    return !!localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
}

export const tokenManager = new TokenManager();
