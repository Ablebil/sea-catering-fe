import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar, Footer } from "./components";
import HomePage from "./pages/HomePage";
import MealPlansPage from "./pages/MealPlansPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import AuthSuccessPage from "./pages/AuthSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { tokenManager } from "./utils/tokenManager";

function App() {
  useEffect(() => {
    tokenManager.initializeTokens();
  }, []);

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal-plans" element={<MealPlansPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/success" element={<AuthSuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
