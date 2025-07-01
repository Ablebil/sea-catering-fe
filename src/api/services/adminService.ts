import { apiService, type ApiResponse } from "../api";

export interface AdminStatsRequest {
  start_date: string;
  end_date: string;
}

export interface StatsResponse {
  count?: number;
  mrr?: number;
}

class AdminService {
  async getNewSubscriptionsStats(params: AdminStatsRequest): Promise<number> {
    const queryParams = new URLSearchParams(
      params as unknown as Record<string, string>
    ).toString();
    const response = await apiService.get<ApiResponse<StatsResponse>>(
      `/subscriptions/admin/stats/new?${queryParams}`
    );
    return response.payload?.count || 0;
  }

  async getMRRStats(params: AdminStatsRequest): Promise<number> {
    const queryParams = new URLSearchParams(
      params as unknown as Record<string, string>
    ).toString();
    const response = await apiService.get<ApiResponse<StatsResponse>>(
      `/subscriptions/admin/stats/mrr?${queryParams}`
    );
    return response.payload?.mrr || 0;
  }

  async getReactivationStats(params: AdminStatsRequest): Promise<number> {
    const queryParams = new URLSearchParams(
      params as unknown as Record<string, string>
    ).toString();
    const response = await apiService.get<ApiResponse<StatsResponse>>(
      `/subscriptions/admin/stats/reactivations?${queryParams}`
    );
    return response.payload?.count || 0;
  }

  async getTotalActiveSubscriptions(): Promise<number> {
    const response = await apiService.get<ApiResponse<StatsResponse>>(
      "/subscriptions/admin/stats/active-total"
    );
    return response.payload?.count || 0;
  }
}

export const adminService = new AdminService();
