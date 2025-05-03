import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "info" | "warning";

// ToastPayload represents the data structure for a toast notification.
// - `type`: Specifies the type of the toast (e.g., success, error, info, warning).
// - `content`: The message or content to be displayed in the toast.
export type ToastPayload = {
  type: ToastType;
  content: string;
};

type ToastState = ToastPayload | null;

const toastSlice = createSlice({
  name: "toast",
  initialState: null as ToastState,
  reducers: {
    showToast: (_, action: PayloadAction<ToastPayload>) => action.payload,
    clearToast: () => null,
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
