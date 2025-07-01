import { apiService, type ApiResponse } from "../api";
import type {
  Subscription,
  PauseSubscriptionRequest,
} from "../../types/Subscription";

export interface SubscriptionRequest {
  name: string;
  phone_number: string;
  delivery_address: string;
  delivery_notes?: string;
  meal_plan_id: string;
  meal_types: string[];
  delivery_days: string[];
  allergies?: string;
}

export interface PaymentResponse {
  token: string;
  redirect_url: string;
}

class SubscriptionService {
  async createSubscription(
    data: SubscriptionRequest
  ): Promise<ApiResponse<PaymentResponse>> {
    return apiService.post<ApiResponse<PaymentResponse>>(
      "/subscriptions",
      data
    );
  }

  async getUserSubscriptions(): Promise<Subscription[]> {
    const response = await apiService.get<ApiResponse<Subscription[]>>(
      "/subscriptions"
    );
    return response.payload || [];
  }

  async pauseSubscription(
    id: string,
    data: PauseSubscriptionRequest
  ): Promise<ApiResponse<Subscription>> {
    return apiService.put<ApiResponse<Subscription>>(
      `/subscriptions/${id}/pause`,
      data
    );
  }

  async cancelSubscription(id: string): Promise<ApiResponse<Subscription>> {
    return apiService.delete<ApiResponse<Subscription>>(`/subscriptions/${id}`);
  }
}

export const subscriptionService = new SubscriptionService();
