import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import acquisitionsReducer from "./acquisitionsSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    acquisitions: acquisitionsReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
