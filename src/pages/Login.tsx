import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Typography } from "antd";
import type { FormProps } from "antd";
import { ThunderboltOutlined, RocketOutlined } from "@ant-design/icons";

import { login } from "../api/auth";
import { setCredentials } from "../store/authSlice";
import { RootState } from "../store";
import { showToast } from "../store/toastSlice.ts";

const { Title, Paragraph } = Typography;

type LoginFormValues = {
  user_id: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onFinish: FormProps<LoginFormValues>["onFinish"] = async values => {
    try {
      const res = await login({ user_id: values.user_id, password: values.password });
      dispatch(setCredentials({ token: res.access, userId: values.user_id }));
      dispatch(showToast({ type: "success", content: "Logged in successfully" }));
      navigate("/dashboard");
    } catch {
      dispatch(showToast({ type: "error", content: "Login failed: Invalid credentials" }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-8">
        <Title level={1} className="flex items-center justify-center gap-3 text-brand-primary">
          <RocketOutlined />
          Light Speed
          <ThunderboltOutlined />
        </Title>

        <Paragraph type="secondary" className="max-w-md mx-auto mt-4">
          🚀 Welcome to your mission dashboard. Log in to manage ore acquisition reports and keep
          Earth updated on the riches of Mars. 🪐
        </Paragraph>
      </div>

      <Form
        name="login"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500, width: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<LoginFormValues>
          label="User ID"
          name="user_id"
          rules={[{ required: true, message: "Please input your user ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginFormValues>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ background: "var(--brand-primary)" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
