import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Acquisition } from "../api/acquisitions";

type AcquisitionsState = {
  data: Acquisition[];
  loading: boolean;
  error: string | null;
};

const initialState: AcquisitionsState = {
  data: [],
  loading: false,
  error: null,
};

const acquisitionsSlice = createSlice({
  name: "acquisitions",
  initialState,
  reducers: {
    setAcquisitions(state, action: PayloadAction<Acquisition[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAcquisitions, setLoading, setError } = acquisitionsSlice.actions;
export default acquisitionsSlice.reducer;
