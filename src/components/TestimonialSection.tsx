import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import TestimonialCarousel from "./TestimonialCarousel";
import TestimonialForm from "./TestimonialForm";
import type { Testimonial } from "../types/Testimonial";
import { testimonialService } from "../services/testimonialService";
import LoadingSpinner from "./LoadingSpinner";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    setIsLoading(true);
    const data = await testimonialService.getAllTestimonials();
    setTestimonials(data);
    setIsLoading(false);
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
    try {
      await testimonialService.createTestimonial(formData);
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

      setError("An unknown error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-green-50 py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-8">
        What Our Customers Say
      </h2>

      {isLoading ? (
        <LoadingSpinner text="Loading testimonials..." />
      ) : (
        <TestimonialCarousel testimonials={testimonials} />
      )}

      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      <TestimonialForm
        onSubmit={handleAddTestimonial}
        isSubmitting={isSubmitting}
      />
    </section>
  );
};

export default TestimonialSection;
