import { describe, it, expect, vi, Mocked } from "vitest";
import { AxiosError, AxiosHeaders } from "axios";

import api from "../axios"; // ← not 'axios' it is the custom axios instance
import { login } from "../auth";

vi.mock("../axios");

const mockedApi = api as Mocked<typeof api>;

describe("login API", () => {
  it("should return access token on success", async () => {
    const fakeResponse = { data: { access: "mock-token" } };
    mockedApi.post.mockResolvedValue(fakeResponse);

    const result = await login({ user_id: "alice", password: "1234" });

    expect(result).toEqual({ access: "mock-token" });
    expect(mockedApi.post).toHaveBeenCalledWith("/token", {
      user_id: "alice",
      password: "1234",
    });
  });

  it("should throw if login fails", async () => {
    const error = new AxiosError(
      "Unauthorized",
      "401",
      {
        headers: new AxiosHeaders(), // AxiosHeaders to create a valid headers object
      },
      {},
      {
        status: 401,
        statusText: "Unauthorized",
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() },
        data: "Unauthorized",
      }
    );

    mockedApi.post.mockRejectedValue(error);

    await expect(login({ user_id: "alice", password: "wrong" })).rejects.toThrow("Unauthorized");
  });
});
