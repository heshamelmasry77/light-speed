import toastSlice, { showToast, clearToast, ToastPayload } from "../toastSlice";

describe("toastSlice", () => {
  const initialState: ToastPayload | null = null;

  it("should handle showToast action", () => {
    const toastData: ToastPayload = {
      type: "success",
      content: "Operation successful!",
    };

    const state = toastSlice(initialState, showToast(toastData));

    expect(state).toEqual(toastData);
  });

  it("should handle clearToast action", () => {
    const toastData: ToastPayload = {
      type: "error",
      content: "Error occurred!",
    };

    const stateWithToast = toastSlice(initialState, showToast(toastData));

    const clearedState = toastSlice(stateWithToast, clearToast());

    expect(clearedState).toBeNull();
  });
});
