import { describe, it, expect, vi, Mocked } from "vitest";

import api from "../axios";
import { fetchAcquisitions, Acquisition } from "../acquisitions";

vi.mock("../axios");
const mockedApi = api as Mocked<typeof api>;

describe("fetchAcquisitions API", () => {
  it("should return an array of acquisitions on success", async () => {
    const fakeData: Acquisition[] = [
      { timestamp: 1620000000, ore_sites: 5 },
      { timestamp: 1620003600, ore_sites: 3 },
    ];
    // Mock the GET call to resolve with { data: fakeData }
    mockedApi.get.mockResolvedValue({ data: fakeData });

    const result = await fetchAcquisitions();

    expect(result).toEqual(fakeData);
    expect(mockedApi.get).toHaveBeenCalledOnce();
    expect(mockedApi.get).toHaveBeenCalledWith("/acquisitions");
  });

  it("should throw when the API call fails", async () => {
    const error = new Error("Network Error");
    mockedApi.get.mockRejectedValue(error);

    await expect(fetchAcquisitions()).rejects.toThrow("Network Error");
  });
});
