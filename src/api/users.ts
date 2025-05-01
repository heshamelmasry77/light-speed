import api from "./axios";

export type User = {
  user_id: string;
  name: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/users");
  return res.data;
};
