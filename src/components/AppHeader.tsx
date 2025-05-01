import { useState } from "react";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { SunOutlined, MoonOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

import { toggleDarkMode } from "../store/themeSlice";
import { RootState } from "../store";
import logo from "../assets/logo.png";

const { Header } = Layout;

const AppHeader = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header
        style={{
          background: "#fff",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
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
              minWidth: 44,
              minHeight: 44,
              marginRight: 8,
              flexShrink: 0,
              objectFit: "contain",
            }}
          />
          <span style={{ fontWeight: 600, fontSize: 18, color: "var(--brand-primary)" }}>
            Light Speed
          </span>
        </Link>

        {/* Desktop right content */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "#000" }} />}
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </Header>

      {/* Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center text-white text-lg space-y-6">
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: 16, right: 16, fontSize: 24, color: "#fff" }}
          />
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/users" onClick={() => setMenuOpen(false)}>
            Users
          </Link>
          <Link to="/acquisitions" onClick={() => setMenuOpen(false)}>
            Acquisitions
          </Link>
          <div>
            Welcome, <strong>{userId}</strong>
          </div>
          <Button
            type="text"
            onClick={() => {
              dispatch(toggleDarkMode());
              setMenuOpen(false);
            }}
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            style={{ color: "#fff", fontSize: 20 }}
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      )}
    </>
  );
};

export default AppHeader;
