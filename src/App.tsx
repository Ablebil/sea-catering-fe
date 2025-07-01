import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar, Footer } from "./components";
import {
  HomePage,
  MealPlansPage,
  SubscriptionPage,
  ContactPage,
  LoginPage,
  RegisterPage,
  VerifyOTPPage,
  AuthSuccessPage,
  DashboardPage,
  AdminDashboardPage,
  NotFoundPage,
} from "./pages";
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
