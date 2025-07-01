import { tokenManager } from "./tokenManager";

interface JWTPayload {
  user_id: string;
  name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];

    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);

    const decodedPayload = atob(paddedPayload);

    return JSON.parse(decodedPayload) as JWTPayload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const getUserFromToken = (): {
  name: string;
  email: string;
  role: string;
} | null => {
  const token = tokenManager.getAccessToken();
  if (!token) {
    return null;
  }

  const payload = decodeJWT(token);
  if (!payload) {
    return null;
  }

  return {
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
};
