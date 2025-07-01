import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            The page you're looking for seems to have gone on a food adventure.
            Don't worry, let's get you back to something delicious!
          </p>
        </div>

        <div className="mb-8">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-6xl">🍽️</div>
          </div>
          <p className="text-gray-500 italic">
            "Even our best chefs can't cook up this page!"
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 cursor-pointer"
            >
              <HomeIcon className="w-5 h-5" />
              Go to Homepage
            </Link>

            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 cursor-pointer"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>

        <div className="mt-12 p-6">
          <p className="text-base text-gray-600 leading-relaxed">
            If you believe this is an error, please{" "}
            <Link
              to="/contact"
              className="text-green-600 hover:text-green-700 font-semibold underline transition duration-200"
            >
              contact our support team
            </Link>{" "}
            and we'll help you right away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
