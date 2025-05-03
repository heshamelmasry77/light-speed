import authSlice, { setCredentials, logout } from "../authSlice";

describe("authSlice", () => {
  const initialState = { token: null, userId: null, isAuthenticated: false };

  it("should handle setCredentials", () => {
    const newState = authSlice(initialState, setCredentials({ token: "abc123", userId: "user1" }));

    expect(newState.token).toBe("abc123");
    expect(newState.userId).toBe("user1");
    expect(newState.isAuthenticated).toBe(true);
  });

  it("should handle logout", () => {
    const loggedInState = { token: "abc123", userId: "user1", isAuthenticated: true };
    const newState = authSlice(loggedInState, logout());

    expect(newState).toEqual(initialState);
  });
});
