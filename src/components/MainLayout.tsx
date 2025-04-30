import { Layout, Menu } from "antd";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DashboardOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

import { logout } from "../store/authSlice";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      type: "divider",
    },
    {
      label: (
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300 cursor-pointer">
          Logout
        </button>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className={"p-4"}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={items}
          style={{ height: "100%", borderRight: 0, display: "flex", flexDirection: "column" }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>Lighting Speed</Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
