import { useEffect, useState } from "react";
import { Table, Typography, Spin, message } from "antd";

import { fetchUsers, User } from "../api/users";

const { Title } = Typography;

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers();
        setUsers(res);
      } catch {
        message.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div className="p-6">
      <Title level={2}>👤 All Users</Title>

      {loading ? (
        <Spin />
      ) : (
        <Table rowKey="user_id" dataSource={users} columns={columns} pagination={false} />
      )}
    </div>
  );
};

export default UsersPage;
