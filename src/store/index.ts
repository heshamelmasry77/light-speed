import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import acquisitionsReducer from "./acquisitionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    acquisitions: acquisitionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
