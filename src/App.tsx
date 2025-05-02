import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { ConfigProvider, theme } from "antd";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import UserDetailPage from "./pages/UserDetail.tsx";
import AcquisitionsPage from "./pages/Acquisitions.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import { RootState } from "./store";
import { clearToast } from "./store/toastSlice";
import GlobalLoader from "./components/GlobalLoader";

const App = () => {
  const isDark = useSelector((state: RootState) => state.theme.darkMode);

  const [messageApi, contextHolder] = message.useMessage();
  const toast = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();
  useEffect(() => {
    if (toast) {
      messageApi.open({
        type: toast.type,
        content: toast.content,
      });
      dispatch(clearToast());
    }
  }, [toast, dispatch, messageApi]);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {contextHolder}
        <GlobalLoader />
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
            <Route path="acquisitions" element={<AcquisitionsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<UserDetailPage />} />
            <Route index element={<Navigate to="/dashboard" />} />
          </Route>

          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </ConfigProvider>
    </>
  );
};

export default App;
