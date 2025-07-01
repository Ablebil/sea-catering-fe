import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import TestimonialCarousel from "./TestimonialCarousel";
import TestimonialForm from "./TestimonialForm";
import type { Testimonial } from "../../types/Testimonial";
import { testimonialService } from "../../api/services/testimonialService";
import LoadingSpinner from "../common/LoadingSpinner";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const data = await testimonialService.getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setError("Failed to load testimonials. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAddTestimonial = async (formData: FormData) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await testimonialService.createTestimonial(formData);
      setSuccessMessage(
        "Thank you for your review! It will be displayed shortly."
      );
      await fetchTestimonials();
    } catch (err: unknown) {
      console.error("Failed to create testimonial:", err);

      if (typeof err === "object" && err !== null) {
        if (
          "payload" in err &&
          typeof (err as { payload?: unknown }).payload === "object" &&
          (err as { payload?: unknown }).payload !== null
        ) {
          const payload = (err as { payload: Record<string, unknown> }).payload;
          const messages = Object.values(payload)
            .filter((v): v is string => typeof v === "string")
            .join(", ");

          if (messages) {
            setError(messages);
            return;
          }
        }

        if (
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        ) {
          setError((err as { message: string }).message);
          return;
        }
      }

      setError(
        "An error occurred while submitting your review. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            eating habits with SEA Catering
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-center font-medium">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {/* Testimonials Display */}
        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner text="Loading testimonials..." />
          </div>
        ) : (
          <TestimonialCarousel testimonials={testimonials} />
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-center font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Testimonial Form */}
        <TestimonialForm
          onSubmit={handleAddTestimonial}
          isSubmitting={isSubmitting}
        />
      </div>
    </section>
  );
};

export default TestimonialSection;
