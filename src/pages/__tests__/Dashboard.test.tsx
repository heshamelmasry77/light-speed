import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import DashboardPage from "../Dashboard";
import { store } from "../../store";
import * as api from "../../api/acquisitions";

vi.mock("../../components/MarsOreMap", () => ({
  default: () => <div data-testid="mars-map" />,
}));

vi.mock("../../components/charts/AcquisitionsChart", () => ({
  default: () => <div data-testid="acquisitions-chart" />,
}));

vi.mock("../../api/acquisitions");

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dashboard and shows data after fetch", async () => {
    const mockData = [
      { timestamp: 1700000000, ore_sites: 8 },
      { timestamp: 1700003600, ore_sites: 5 },
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const fetchMock = api.fetchAcquisitions as unknown as vi.Mock;
    fetchMock.mockResolvedValue(mockData);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardPage />
        </BrowserRouter>
      </Provider>
    );

    // Title should always show
    expect(screen.getByText(/Good to see you again/i)).toBeInTheDocument();

    // Wait for data to load and UI to update
    await waitFor(() => {
      expect(screen.getByText(/Total Acquisitions/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Ore Sites/i)).toBeInTheDocument();
      expect(screen.getByTestId("mars-map")).toBeInTheDocument();
      expect(screen.getByTestId("acquisitions-chart")).toBeInTheDocument();
    });
  });
});
