import { Column } from "@ant-design/plots";
import { startOfWeek, format } from "date-fns";

import { Acquisition } from "../api/acquisitions";

type Props = {
  data: Acquisition[];
};

const WeeklySitesChart = ({ data }: Props) => {
  const grouped: Record<string, { total: number; count: number }> = {};

  data.forEach(item => {
    const week = format(startOfWeek(new Date(item.timestamp * 1000)), "yyyy-MM-dd");
    if (!grouped[week]) grouped[week] = { total: 0, count: 0 };
    grouped[week].total += item.ore_sites;
    grouped[week].count++;
  });

  const chartData = Object.entries(grouped).map(([week, val]) => ({
    week,
    avg_sites: Math.floor(val.total / val.count),
  }));

  const config = {
    data: chartData,
    xField: "week",
    yField: "avg_sites",
    height: 300,
    label: { text: "Average Sites" },
    color: "#7c3aed",
  };

  return <Column {...config} />;
};

export default WeeklySitesChart;
