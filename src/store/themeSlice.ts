import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  darkMode: boolean;
};
const localStorageTheme = localStorage.getItem("darkMode");
const initialState: ThemeState = {
  darkMode: localStorageTheme === "true", // string comparison with "true"
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode.toString());
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", action.payload.toString());
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
