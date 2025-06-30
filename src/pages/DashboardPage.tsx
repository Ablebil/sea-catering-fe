import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
