import { Layout } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import logo from "../assets/logo.png";

const { Header } = Layout;

const AppHeader = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Light Speed Logo"
          style={{
            height: 44,
            width: 44,
            marginRight: 8,
          }}
        />
        <span style={{ fontWeight: 600, fontSize: 18, color: "var(--brand-primary)" }}>
          Light Speed
        </span>
      </div>

      <div style={{ fontSize: 14, color: "var(--brand-accent)" }}>
        Welcome, <strong>{userId}</strong>
      </div>
    </Header>
  );
};

export default AppHeader;
