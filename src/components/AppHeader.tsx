import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

import { toggleDarkMode } from "../store/themeSlice";
import { RootState } from "../store";
import logo from "../assets/logo.png";

const { Header } = Layout;

const AppHeader = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Logo + Title */}
      <Link to="/dashboard" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Light Speed Logo"
          className="rocket-bounce rocket-hover cursor-pointer"
          style={{
            height: 44,
            width: 44,
            marginRight: 8,
          }}
        />
        <span style={{ fontWeight: 600, fontSize: 18, color: "var(--brand-primary)" }}>
          Light Speed
        </span>
      </Link>
      <div className={"flex items-center gap-4"}>
        <div style={{ fontSize: 14, color: "var(--brand-accent)" }}>
          Welcome, <strong>{userId}</strong>
        </div>

        <Button
          type="text"
          onClick={() => dispatch(toggleDarkMode())}
          className="theme-toggle"
          style={{ fontSize: 20, color: "var(--brand-primary)" }}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? <SunOutlined /> : <MoonOutlined />}
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
