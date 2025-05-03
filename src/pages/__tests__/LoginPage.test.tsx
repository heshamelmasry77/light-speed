import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { vi, Mock } from "vitest";

import LoginPage from "../Login";
import { store } from "../../store";
import * as authApi from "../../api/auth";

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the login API function
vi.mock("../../api/auth");

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render and submit the form", async () => {
    const mockLogin = authApi.login as unknown as Mock;
    mockLogin.mockResolvedValue({ access: "fake-token" });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/user id/i), {
      target: { value: "alice" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        user_id: "alice",
        password: "1234",
      });
    });
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});
