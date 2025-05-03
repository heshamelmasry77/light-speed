import { Layout, Menu } from "antd";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useState } from "react";

import { logout } from "../store/authSlice";
import AppHeader from "./AppHeader.tsx";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const items: MenuItem[] = [
    {
      label: <Link to="/dashboard">Dashboard</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to="/users">Users</Link>,
      key: "users",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/acquisitions">Acquisitions</Link>,
      key: "acquisitions",
      icon: <BarChartOutlined />,
    },
    {
      type: "divider",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="md"
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="p-4 hidden md:flex flex-col"
      >
        <div className="flex-1">
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            items={items}
            theme="dark"
            style={{
              borderRight: 0,
              color: "#fff",
            }}
          />
        </div>

        {/* Logout button styled like a menu item */}
        <div className="mt-4 px-2">
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-400 hover:text-red-300 flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <LogoutOutlined />
            <span className={collapsed ? "hidden" : "inline"}>Logout</span>
          </button>
        </div>
      </Sider>

      <Layout>
        <AppHeader />
        <Content className={"m-4"}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
