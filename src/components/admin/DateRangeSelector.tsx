import { useState } from "react";

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  loading?: boolean;
}

const DateRangeSelector = ({
  startDate,
  endDate,
  onDateChange,
  loading = false,
}: DateRangeSelectorProps) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleApply = () => {
    if (localStartDate && localEndDate && localStartDate <= localEndDate) {
      onDateChange(localStartDate, localEndDate);
    }
  };

  const handleQuickSelect = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    setLocalStartDate(formattedStartDate);
    setLocalEndDate(formattedEndDate);
    onDateChange(formattedStartDate, formattedEndDate);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-green-900 mb-6">
        Date Range Filter
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Select
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleQuickSelect(7)}
              disabled={loading}
              className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => handleQuickSelect(30)}
              disabled={loading}
              className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => handleQuickSelect(90)}
              disabled={loading}
              className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Last 90 Days
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={localEndDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
            disabled={loading}
            min={localStartDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="lg:col-span-2">
          <button
            onClick={handleApply}
            disabled={
              loading ||
              !localStartDate ||
              !localEndDate ||
              localStartDate > localEndDate
            }
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Apply Filter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;
