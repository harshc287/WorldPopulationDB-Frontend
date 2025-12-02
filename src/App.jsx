import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import Continents from "./pages/Continents";
import Countries from "./pages/Countries";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/continents" element={<Continents />} />
          <Route path="/countries" element={<Countries />} />
        </Route>
      </Routes>
    </Router>
  );
}
