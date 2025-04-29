import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
};

export default App;
