import { StarIcon } from "@heroicons/react/24/solid";
import type { Testimonial } from "../types/Testimonial";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 max-w-6xl mx-auto px-2">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col"
        >
          {t.image && (
            <img
              src={t.image}
              alt="User upload"
              className="w-full h-32 object-cover rounded mb-3"
            />
          )}
          <p className="text-gray-700 mb-2 italic break-words">"{t.message}"</p>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, idx) => (
              <StarIcon
                key={idx}
                className={`w-5 h-5 ${
                  idx < t.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-green-800 mt-auto">
            – {t.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCarousel;
