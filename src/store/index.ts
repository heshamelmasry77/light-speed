import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import acquisitionsReducer from "./acquisitionsSlice";
import toastReducer from "./toastSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    acquisitions: acquisitionsReducer,
    toast: toastReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
