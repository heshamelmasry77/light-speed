import acquisitionsSlice, { setAcquisitions, setLoading, setError } from "../acquisitionsSlice";
import { Acquisition } from "../../api/acquisitions";

describe("acquisitionsSlice", () => {
  const initialState = {
    data: [] as Acquisition[],
    loading: false,
    error: null as string | null,
  };

  it("should handle setAcquisitions action", () => {
    const sampleData: Acquisition[] = [
      { timestamp: 1234567890, ore_sites: 5 },
      { timestamp: 1234567891, ore_sites: 7 },
    ];

    const state = acquisitionsSlice(initialState, setAcquisitions(sampleData));

    expect(state.data).toEqual(sampleData);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle setLoading action (true)", () => {
    const state = acquisitionsSlice(initialState, setLoading(true));

    expect(state.loading).toBe(true);
  });

  it("should handle setLoading action (false)", () => {
    const loadingState = { ...initialState, loading: true };
    const state = acquisitionsSlice(loadingState, setLoading(false));

    expect(state.loading).toBe(false);
  });

  it("should handle setError action", () => {
    const state = acquisitionsSlice(initialState, setError("Error loading data"));

    expect(state.error).toBe("Error loading data");
  });

  it("should reset error to null when new data is set", () => {
    const errorState = { ...initialState, error: "Previous error" };
    const sampleData: Acquisition[] = [{ timestamp: 1234567892, ore_sites: 3 }];

    const state = acquisitionsSlice(errorState, setAcquisitions(sampleData));

    expect(state.error).toBeNull();
    expect(state.data).toEqual(sampleData);
  });
});
