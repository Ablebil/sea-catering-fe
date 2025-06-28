import React, { useRef } from "react";
import type { MealPlan } from "../types/MealPlan";
import MealPlanCard from "./MealPlanCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface HorizontalScrollProps {
  plans: MealPlan[];
  onSeeMore: (planId: string) => void;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  plans,
  onSeeMore,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 max-w-[1500px] mx-auto">
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex bg-white text-green-700 border border-green-700 hover:bg-green-100 rounded-full w-12 h-12 items-center justify-center shadow-md"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scroll-smooth px-2 py-4 scrollbar-hide"
        style={{ maxWidth: "1000px" }}
      >
        {plans.map((plan) => (
          <div key={plan.id} className="flex-shrink-0 w-72">
            <MealPlanCard plan={plan} onSeeMore={onSeeMore} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex bg-white text-green-700 border border-green-700 hover:bg-green-100 rounded-full w-12 h-12 items-center justify-center shadow-md"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HorizontalScroll;
