import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import MealPlansPage from "./pages/MealPlansPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal-plans" element={<MealPlansPage />} />
      </Routes>
    </>
  );
}

export default App;
