import { useAuth } from "../../hooks/useAuth";

const ProfileSection = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">User information not available</p>
      </div>
    );
  }

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-green-900 mb-6">
          Profile Information
        </h2>

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
              <span className="text-gray-900">{user.name}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
              <span className="text-gray-900">{user.email}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
              <span className="text-gray-900">●●●●●●●</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Quick Stats
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-700">✓</div>
              <div className="text-xs text-green-600">Account Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
