import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import type { Testimonial } from "../types/Testimonial";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="mb-12 max-w-6xl mx-auto px-2">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={t.image}
              alt="User upload"
              className="w-full h-32 object-cover rounded mb-3"
            />
            <p className="text-gray-700 mb-2 italic break-words">
              "{t.message}"
            </p>
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

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="overflow-hidden w-full flex justify-center">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${testimonials.length * 100}%`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full flex justify-center"
                style={{ width: "100%" }}
              >
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col w-[280px] h-[360px] mx-auto">
                  <img
                    src={t.image}
                    alt="User upload"
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <p className="text-gray-700 mb-2 italic break-words">
                    "{t.message}"
                  </p>
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
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                currentIndex === i ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
