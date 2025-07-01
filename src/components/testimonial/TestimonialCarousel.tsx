import { useEffect, useState } from "react";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import type { Testimonial } from "../../types/Testimonial";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedTestimonials = testimonials.slice(0, 6);

  useEffect(() => {
    if (displayedTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === displayedTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [displayedTestimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayedTestimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === displayedTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, idx) => (
        <StarIcon
          key={idx}
          className={`w-5 h-5 ${
            idx < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  if (displayedTestimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No testimonials available yet.</p>
      </div>
    );
  }

  return (
    <div className="mb-12 max-w-6xl mx-auto px-4">
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto rounded-full p-0.5 bg-gradient-to-r from-green-400 to-green-600">
                  <img
                    src={testimonial.photo_url}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                </div>
              </div>

              <div className="flex justify-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <blockquote className="text-gray-700 text-center mb-4 leading-relaxed italic">
                "{testimonial.message}"
              </blockquote>

              <div className="text-center">
                <p className="font-semibold text-green-800 text-lg">
                  {testimonial.name}
                </p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="block lg:hidden relative">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {displayedTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-md border border-gray-100">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full p-0.5 bg-gradient-to-r from-green-400 to-green-600">
                      <img
                        src={testimonial.photo_url}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full border-2 border-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    {renderStars(testimonial.rating)}
                  </div>

                  <blockquote className="text-gray-700 text-center mb-6 leading-relaxed italic text-lg">
                    "{testimonial.message}"
                  </blockquote>

                  <div className="text-center">
                    <p className="font-semibold text-green-800 text-xl">
                      {testimonial.name}
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-lg transition duration-200 z-10"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-lg transition duration-200 z-10"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {displayedTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === i
                  ? "w-8 h-3 bg-green-600"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
