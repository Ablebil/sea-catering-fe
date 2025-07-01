import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "text-green-500 font-semibold"
        : "text-white hover:text-green-300"
    }`;

  const handleLoginClick = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
    setIsProfileDropdownOpen(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-green-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white font-bold text-xl">
            <NavLink to="/">SEA Catering</NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/meal-plans" className={navLinkClass}>
                Meal Plans
              </NavLink>
              <NavLink to="/subscription" className={navLinkClass}>
                Subscription
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 text-white hover:text-green-300 transition duration-300 ml-4 cursor-pointer"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <div className="text-sm text-left">
                    <div className="font-medium">{user?.name}</div>
                    {user?.role === "admin" && (
                      <div className="text-xs text-green-300">Admin</div>
                    )}
                  </div>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleDashboardClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 text-sm cursor-pointer ml-4"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-green-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-green-900 text-white transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 md:hidden`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-green-700">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6 text-white" />
                <div>
                  <div className="text-sm font-medium">{user?.name}</div>
                  {user?.role === "admin" && (
                    <div className="text-xs text-green-300">Admin</div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 text-sm cursor-pointer"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col px-4 pt-4 space-y-4">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/meal-plans"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Meal Plans
            </NavLink>
            <NavLink
              to="/subscription"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Subscription
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </NavLink>

            {/* Mobile Auth Menu */}
            {isAuthenticated && (
              <>
                <hr className="border-green-700 my-2" />
                <button
                  onClick={handleDashboardClick}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white hover:text-green-300 cursor-pointer"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white hover:text-green-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
