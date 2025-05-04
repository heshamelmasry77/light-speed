import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import UserDetailPage from "../UserDetail";
import { store } from "../../store";
import * as api from "../../api/users";

vi.mock("../../api/users");

describe("UserDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user form with prefilled data", async () => {
    const mockUser = {
      user_id: "alice",
      name: "Alice Mars",
      password: "1234",
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fetchMock = api.fetchUserById as unknown as vi.Mock;
    fetchMock.mockResolvedValue(mockUser);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/alice"]}>
          <Routes>
            <Route path="/users/:id" element={<UserDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Title is always visible
    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();

    // Wait for input values to be set
    await waitFor(() => {
      expect(screen.getByDisplayValue("Alice Mars")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1234")).toBeInTheDocument();
    });

    // User ID should be present but disabled
    expect(screen.getByDisplayValue("alice")).toBeDisabled();
  });
});
