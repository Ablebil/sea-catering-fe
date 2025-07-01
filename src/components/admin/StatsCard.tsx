interface StatsCardProps {
  title: string;
  value: string | number;
  loading?: boolean;
  icon?: React.ReactNode;
  color?: "green" | "blue" | "yellow" | "purple";
}

const StatsCard = ({
  title,
  value,
  loading = false,
  icon,
  color = "green",
}: StatsCardProps) => {
  const colorClasses = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      iconBg: "bg-green-100",
      iconText: "text-green-600",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-900",
      iconBg: "bg-yellow-100",
      iconText: "text-yellow-600",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-900",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`${colors.bg} ${colors.border} border rounded-lg p-6 shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${colors.text}`}>{title}</p>
          {loading ? (
            <div className="mt-2">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ) : (
            <p className={`text-3xl font-bold ${colors.text} mt-2`}>{value}</p>
          )}
        </div>
        {icon && (
          <div className={`${colors.iconBg} p-3 rounded-lg`}>
            <div className={`${colors.iconText} w-6 h-6`}>{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
