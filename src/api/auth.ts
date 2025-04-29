import api from "./axios";

type LoginPayload = {
  user_id: string;
  password: string;
};

type LoginResponse = {
  access: string;
};

export const login = async (credentials: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/token", credentials);
  return response.data;
};
