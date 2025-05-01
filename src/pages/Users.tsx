import { useEffect, useState } from "react";
import { Table, Typography, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

import { fetchUsers, User } from "../api/users";

const { Title } = Typography;

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <Table
          rowKey="user_id"
          dataSource={users}
          columns={columns}
          pagination={false}
          onRow={record => ({
            onClick: () => navigate(`/users/${record.user_id}`),
            style: { cursor: "pointer" },
          })}
        />
      )}
    </div>
  );
};

export default UsersPage;
