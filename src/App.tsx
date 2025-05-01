import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route index element={<Navigate to="/dashboard" />} />
      </Route>

      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
};

export default App;
