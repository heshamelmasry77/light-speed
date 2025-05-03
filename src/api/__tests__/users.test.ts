import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";

import api from "../axios";
import { fetchUsers, fetchUserById, User } from "../users";

vi.mock("../axios");
const mockedApi = api as Mocked<typeof api>;

beforeEach(() => {
  mockedApi.get.mockClear(); // Clear previous mock calls
});

describe("fetchUsers API", () => {
  it("should fetch the list of users successfully", async () => {
    const fakeUsers: User[] = [
      { user_id: "alice", name: "Alice Smith" },
      { user_id: "bob", name: "Bob Johnson" },
    ];

    mockedApi.get.mockResolvedValue({ data: fakeUsers });

    const result = await fetchUsers();

    expect(result).toEqual(fakeUsers);
    expect(mockedApi.get).toHaveBeenCalledWith("/users");
    expect(mockedApi.get).toHaveBeenCalledOnce();
  });

  it("should throw an error if fetching users fails", async () => {
    mockedApi.get.mockRejectedValue(new Error("Failed to fetch users"));

    await expect(fetchUsers()).rejects.toThrow("Failed to fetch users");
    expect(mockedApi.get).toHaveBeenCalledOnce();
  });
});

describe("fetchUserById API", () => {
  it("should fetch user details successfully by ID", async () => {
    const fakeUser = {
      user_id: "alice",
      name: "Alice Smith",
      password: "1234",
    };

    mockedApi.get.mockResolvedValue({ data: fakeUser });

    const result = await fetchUserById("alice");

    expect(result).toEqual(fakeUser);
    expect(mockedApi.get).toHaveBeenCalledWith("/users/alice");
    expect(mockedApi.get).toHaveBeenCalledOnce();
  });

  it("should throw an error if fetching user by ID fails", async () => {
    mockedApi.get.mockRejectedValue(new Error("User not found"));

    await expect(fetchUserById("invalid")).rejects.toThrow("User not found");
    expect(mockedApi.get).toHaveBeenCalledOnce();
  });
});
