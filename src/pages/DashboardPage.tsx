import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ProfileSection, SubscriptionsSection } from "../components";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">Dashboard</h1>
        </div>

        {/* Content Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section - Takes 4 columns on large screens */}
          <div className="lg:col-span-4">
            <ProfileSection />
          </div>

          {/* Subscriptions Section - Takes 8 columns on large screens */}
          <div className="lg:col-span-8">
            <SubscriptionsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
