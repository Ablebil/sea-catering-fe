import { useState } from "react";
import TestimonialCarousel from "./TestimonialCarousel";
import TestimonialForm from "./TestimonialForm";
import type { Testimonial } from "../types/Testimonial";
import healthyFoodImg from "../assets/healthy-food.jpg";
import ketoFoodImg from "../assets/keto-food.jpg";
import veganFoodImg from "../assets/vegan-food.jpg";
import familyFoodImg from "../assets/family-food.jpg";

const initialTestimonials: Testimonial[] = [
  {
    name: "James",
    message: "Family plan was perfect—tasty and filling!",
    rating: 5,
    image: familyFoodImg,
  },
  {
    name: "Emily",
    message: "Loved the vegan meals. So fresh!",
    rating: 4,
    image: veganFoodImg,
  },
  {
    name: "Michael",
    message: "Keto plan fits my diet and tastes great!",
    rating: 5,
    image: ketoFoodImg,
  },
  {
    name: "Sophia",
    message: "Healthy plan keeps me energized!",
    rating: 4,
    image: healthyFoodImg,
  },
  {
    name: "Daniel",
    message: "Reliable service and great food!",
    rating: 4,
    image: familyFoodImg,
  },
];

const TestimonialSection = () => {
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);

  const handleAddTestimonial = () => {};

  return (
    <section className="bg-green-50 py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-8">
        What Our Customers Say
      </h2>
      <TestimonialCarousel testimonials={testimonials} />
      <TestimonialForm onSubmit={handleAddTestimonial} />
    </section>
  );
};

export default TestimonialSection;
