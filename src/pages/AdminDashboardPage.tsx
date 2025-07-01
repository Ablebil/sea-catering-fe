import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import AdminDashboardContent from "../components/admin/AdminDashboardContent";

const AdminDashboardPage = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Admin Dashboard
          </h1>
        </div>

        <AdminDashboardContent />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
