import { apiService, type ApiResponse } from "../api";
import type { User } from "../../types/User";

class UserService {
  async getProfile(): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>("/users/profile");
    return response.payload || { name: "", email: "" };
  }
}

export const userService = new UserService();
