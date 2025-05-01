import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "info" | "warning";

type ToastPayload = {
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
