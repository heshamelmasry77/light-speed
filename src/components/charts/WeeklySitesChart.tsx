import { Column } from "@ant-design/plots";
import { startOfWeek, format } from "date-fns";

import { Acquisition } from "../../api/acquisitions";

type Props = {
  data: Acquisition[];
};

/**
 * 📅 WeeklySitesChart
 *
 * This chart shows the **average number of ore sites detected per acquisition**, grouped by week.
 * Each bar represents one week's average ore site count.
 *
 * 👉 Why it's useful:
 * - Helps track trends in ore detection over time
 * - Smooths the data by grouping into weekly periods
 * - Ideal for identifying mission-wide performance patterns or seasonal fluctuations
 */
const WeeklySitesChart = ({ data }: Props) => {
  // Step 1: Group acquisitions by the start of each week (Monday)
  const grouped: Record<string, { total: number; count: number }> = {};

  data.forEach(item => {
    const week = format(startOfWeek(new Date(item.timestamp * 1000)), "yyyy-MM-dd");
    if (!grouped[week]) grouped[week] = { total: 0, count: 0 };

    grouped[week].total += item.ore_sites;
    grouped[week].count++;
  });

  // Step 2: Calculate the average ore sites per week
  const chartData = Object.entries(grouped).map(([week, val]) => ({
    week,
    avg_sites: Math.floor(val.total / val.count), // rounded down to keep it clean
  }));

  const config = {
    data: chartData,
    xField: "week", // x-axis: the start of each week
    yField: "avg_sites", // y-axis: average ore sites detected that week
    height: 300,
    label: { text: "Average" },
    color: "#7c3aed", // Purple brand color
  };

  return <Column {...config} data-testid="weekly-chart" />;
};

export default WeeklySitesChart;
