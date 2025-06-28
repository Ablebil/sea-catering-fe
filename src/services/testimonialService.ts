import { apiService, type ApiResponse } from "./api";
import type { Testimonial } from "../types/Testimonial";

class TestimonialService {
  async getAllTestimonials(): Promise<Testimonial[]> {
    const response = await apiService.get<ApiResponse<Testimonial[]>>(
      "/testimonials"
    );
    return response.payload || [];
  }

  async createTestimonial(formData: FormData): Promise<ApiResponse<unknown>> {
    return apiService.postWithFormData<ApiResponse<unknown>>(
      "/testimonials",
      formData
    );
  }
}

export const testimonialService = new TestimonialService();
