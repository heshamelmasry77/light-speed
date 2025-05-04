import { Column } from "@ant-design/plots";

import { Acquisition } from "../../api/acquisitions";

type Props = {
  data: Acquisition[];
};

/**
 * 📊 SiteDistributionChart
 *
 * This chart shows a histogram of how many acquisitions fall into various "ore site count" ranges.
 * Each bar represents a bucket like 0–4, 5–9, 10–14, etc., based on the number of ore sites detected
 * in each acquisition.
 *
 * 👉 Why it's useful:
 * - Helps visualize how common high-yield or low-yield scans are
 * - Gives a quick distribution overview of the ore site detection levels
 * - Great for identifying patterns in data quality
 */
const SiteDistributionChart = ({ data }: Props) => {
  const bins: Record<string, number> = {};

  // Group each acquisition into a bucket of 5 (e.g. 0–4, 5–9, etc.)
  data.forEach(({ ore_sites }) => {
    const bucket = `${Math.floor(ore_sites / 5) * 5}-${Math.floor(ore_sites / 5) * 5 + 4}`;
    bins[bucket] = (bins[bucket] || 0) + 1;
  });

  // Convert grouped bucket data into array format for the chart
  const chartData = Object.entries(bins).map(([range, count]) => ({
    range,
    count,
  }));

  const config = {
    data: chartData,
    xField: "range", // bucket label (e.g. "0–4", "5–9")
    yField: "count", // number of acquisitions in that range
    height: 300,
    label: { text: "count" }, // label each bar with the count
    color: "var(--brand-accent)", // Attempts to use the brand color for bars, but this variable is not rendering as expected. Further investigation is needed to determine the cause.
  };

  return <Column {...config} data-testid="dist-chart" />;
};

export default SiteDistributionChart;
