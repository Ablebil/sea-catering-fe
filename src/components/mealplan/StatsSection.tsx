import { ClockIcon, HeartIcon, TruckIcon } from "@heroicons/react/24/outline";

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <ClockIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">30 min</h3>
        <p className="text-gray-600">Average prep time</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <HeartIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">100%</h3>
        <p className="text-gray-600">Fresh ingredients</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <TruckIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">24h</h3>
        <p className="text-gray-600">Delivery time</p>
      </div>
    </div>
  );
};

export default StatsSection;
