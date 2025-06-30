import { apiService, type ApiResponse } from "../api";
import type { MealPlan } from "../../types/MealPlan";

class MealPlanService {
  async getAllMealPlans(): Promise<MealPlan[]> {
    const response = await apiService.get<ApiResponse<MealPlan[]>>(
      "/meal-plans"
    );
    return response.payload || [];
  }

  async getMealPlanById(id: string): Promise<MealPlan | null> {
    const response = await apiService.get<ApiResponse<MealPlan>>(
      `/meal-plans/${id}`
    );
    return response.payload || null;
  }
}

export const mealPlanService = new MealPlanService();
