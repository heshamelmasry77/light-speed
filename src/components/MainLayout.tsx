import { Layout, Menu } from "antd";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../store/authSlice";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className={"flex flex-col gap-4 h-full"}>
          <div className={"p-4"}>
            <Menu theme="dark" mode="inline" className={"flex flex-col gap-4"}>
              <Menu.Item key="1">
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/users">Users</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="p-4 border-t border-gray-700 mt-auto">
            <button
              onClick={handleLogout}
              className="text-red-400 w-full text-left hover:text-red-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>Lighting Speed</Header>
        <Content style={{ margin: "16px" }}>
          <Outlet /> {/* This is where the nested routes will be rendered something like slot */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
