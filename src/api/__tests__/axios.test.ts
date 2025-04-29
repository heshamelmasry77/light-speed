import axios from "../axios";

describe("Axios Auth Interceptor", () => {
  const token = "test-token";

  beforeEach(() => {
    localStorage.clear();
  });

  it("should set Authorization header when token exists", async () => {
    localStorage.setItem("accessToken", token);
    await axios.get("/some-endpoint", {
      adapter: config => {
        expect(config.headers.Authorization).toBe(`Bearer ${token}`);
        return Promise.resolve({
          data: {},
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
      },
    });
  });

  it("should NOT set Authorization header when no token exists", async () => {
    await axios.get("/some-endpoint", {
      adapter: config => {
        expect(config.headers.Authorization).toBeUndefined();
        return Promise.resolve({
          data: {},
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
      },
    });
  });
});
