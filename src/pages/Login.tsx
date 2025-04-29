import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import type { FormProps } from "antd";

import { login } from "../api/auth";
import { setCredentials } from "../store/authSlice";

type LoginFormValues = {
  user_id: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<LoginFormValues>["onFinish"] = async values => {
    try {
      const res = await login({ user_id: values.user_id, password: values.password });
      dispatch(setCredentials({ token: res.access, userId: values.user_id }));
      message.success("Logged in successfully");
      navigate("/dashboard");
    } catch {
      message.error("Login failed: Invalid credentials");
    }
  };

  return (
    <Form
      name="login"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 500, margin: "auto", marginTop: "10vh" }}
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
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
