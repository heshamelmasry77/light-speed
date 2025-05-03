import themeSlice, { toggleDarkMode, setDarkMode } from "../themeSlice";

describe("themeSlice", () => {
  const initialState = {
    darkMode: false,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should toggle dark mode", () => {
    const state = themeSlice(initialState, toggleDarkMode());

    expect(state.darkMode).toBe(true);
    expect(localStorage.getItem("darkMode")).toBe("true");

    const toggledAgain = themeSlice(state, toggleDarkMode());

    expect(toggledAgain.darkMode).toBe(false);
    expect(localStorage.getItem("darkMode")).toBe("false");
  });

  it("should set dark mode explicitly", () => {
    const state = themeSlice(initialState, setDarkMode(true));

    expect(state.darkMode).toBe(true);
    expect(localStorage.getItem("darkMode")).toBe("true");

    const stateLight = themeSlice(state, setDarkMode(false));

    expect(stateLight.darkMode).toBe(false);
    expect(localStorage.getItem("darkMode")).toBe("false");
  });
});
