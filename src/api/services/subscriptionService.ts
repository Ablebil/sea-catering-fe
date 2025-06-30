import { apiService, type ApiResponse } from "../api";

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
}

export const subscriptionService = new SubscriptionService();
