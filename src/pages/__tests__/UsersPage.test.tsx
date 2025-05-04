import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import UsersPage from "../Users";
import { store } from "../../store";
import * as api from "../../api/users";

vi.mock("../../api/users");

describe("UsersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user table after loading", async () => {
    const mockUsers = [
      { user_id: "alice", name: "Alice" },
      { user_id: "bob", name: "Bob" },
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fetchMock = api.fetchUsers as unknown as vi.Mock;
    fetchMock.mockResolvedValue(mockUsers);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UsersPage />
        </BrowserRouter>
      </Provider>
    );

    // Title should show
    expect(screen.getByText(/All Users/i)).toBeInTheDocument();

    // Table rows appear after data loads
    await waitFor(() => {
      expect(screen.getByText("Alice Mars")).toBeInTheDocument();
      expect(screen.getByText("Bob Rocket")).toBeInTheDocument();
    });

    // Optional: Check table headers
    expect(screen.getByText(/User ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });
});
