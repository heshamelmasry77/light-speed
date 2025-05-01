import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Form, Input, Button, message } from "antd";
import { useSelector } from "react-redux";

import { fetchUserById } from "../api/users";
import api from "../api/axios";
import { RootState } from "../store";

const { Title } = Typography;

type FormValues = {
  name: string;
  password: string;
};

const UserDetailPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUserById(id!);
        form.setFieldsValue(user);
        setEditable(user.user_id === currentUser);
      } catch {
        message.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, currentUser, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await api.post(`/users/${id}`, values);
      form.setFieldsValue(res.data);
      message.success("Profile updated successfully");
    } catch {
      message.error("Failed to update profile");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <Title level={2}>🧑‍🚀 User Profile</Title>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={!editable}
          style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto" }}
        >
          <Form.Item label="User ID" name="user_id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          {editable && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "var(--brand-primary)",
                }}
              >
                Update Profile
              </Button>
            </Form.Item>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default UserDetailPage;
