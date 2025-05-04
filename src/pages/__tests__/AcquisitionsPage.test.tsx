import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import AcquisitionsPage from "../Acquisitions";
import { store } from "../../store";
import * as api from "../../api/acquisitions";

vi.mock("../../components/charts/WeeklySitesChart", () => ({
  default: () => <div data-testid="weekly-chart" />,
}));

vi.mock("../../components/charts/SiteDistributionChart", () => ({
  default: () => <div data-testid="dist-chart" />,
}));

vi.mock("../../api/acquisitions");

describe("AcquisitionsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title and shows charts after loading", async () => {
    // Prepare fake data
    const mockData = [
      { timestamp: 1700000000, ore_sites: 8 },
      { timestamp: 1700003600, ore_sites: 5 },
    ];

    // Mock the fetchAcquisitions API call
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fetchMock = api.fetchAcquisitions as unknown as vi.Mock;
    fetchMock.mockResolvedValue(mockData);

    // Render the page
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AcquisitionsPage />
        </BrowserRouter>
      </Provider>
    );

    // Title should be visible
    expect(screen.getByText(/Acquisitions Analytics/i)).toBeInTheDocument();

    // Charts appear after loading
    await waitFor(() => {
      expect(screen.getByTestId("weekly-chart")).toBeInTheDocument();
      expect(screen.getByTestId("dist-chart")).toBeInTheDocument();
    });

    // Subtitles of the chart cards
    expect(screen.getByText(/Weekly Average Sites/i)).toBeInTheDocument();
    expect(screen.getByText(/Ore Site Distribution/i)).toBeInTheDocument();
  });
});
