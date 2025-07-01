import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Transform Your Eating Habits?
        </h2>
        <p className="text-xl text-green-100 mb-8 leading-relaxed">
          Join thousands of satisfied customers and start your journey to a
          healthier lifestyle today. No commitment required - pause or cancel
          anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/subscription"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-green-50 transition duration-300 text-lg"
          >
            Start Your Subscription
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link
            to="/meal-plans"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-green-600 transition duration-300 text-lg"
          >
            View Meal Plans
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-white">1000+</div>
            <div className="text-green-100">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-green-100">Cities Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">99%</div>
            <div className="text-green-100">On-Time Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
