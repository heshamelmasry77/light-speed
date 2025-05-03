import loadingSlice, { showLoader, hideLoader } from "../loadingSlice";

describe("loadingSlice", () => {
  const initialState = {
    isLoading: false,
  };

  it("should handle showLoader action", () => {
    const state = loadingSlice(initialState, showLoader());
    expect(state.isLoading).toBe(true);
  });

  it("should handle hideLoader action", () => {
    const loadingState = { isLoading: true };
    const state = loadingSlice(loadingState, hideLoader());
    expect(state.isLoading).toBe(false);
  });
});
