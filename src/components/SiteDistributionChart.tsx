import { Column } from "@ant-design/plots";

import { Acquisition } from "../api/acquisitions";

type Props = {
  data: Acquisition[];
};

const SiteDistributionChart = ({ data }: Props) => {
  const bins: Record<string, number> = {};

  data.forEach(({ ore_sites }) => {
    const bucket = `${Math.floor(ore_sites / 5) * 5}-${Math.floor(ore_sites / 5) * 5 + 4}`;
    bins[bucket] = (bins[bucket] || 0) + 1;
  });

  const chartData = Object.entries(bins).map(([range, count]) => ({
    range,
    count,
  }));

  const config = {
    data: chartData,
    xField: "range",
    yField: "count",
    height: 300,
    label: { text: "count" },
    color: "var(--brand-accent)",
  };

  return <Column {...config} />;
};

export default SiteDistributionChart;
