import { Column } from "@ant-design/plots";

import { Acquisition } from "../../api/acquisitions";

type Props = {
  data: Acquisition[];
};

const AcquisitionsChart = ({ data }: Props) => {
  // Group by date and sum ore_sites
  const grouped: Record<string, number> = {};

  data.forEach(item => {
    const date = new Date(item.timestamp * 1000).toISOString().split("T")[0];
    grouped[date] = (grouped[date] || 0) + item.ore_sites;
  });

  const chartData = Object.entries(grouped)
    .map(([date, sites]) => ({ date, sites }))
    .slice(-30);

  const config = {
    data: chartData,
    xField: "date",
    yField: "sites",
    height: 300,
    autoFit: true,
    colorField: "sites",
    label: {
      text: (originData: { sites: number }) => (originData.sites < 10 ? `${originData.sites}` : ""),
      offset: 10,
    },
    xAxis: {
      label: {
        rotate: -45,
        style: {
          fontSize: 10,
        },
      },
    },
    legend: false,
    tooltip: {
      items: ["date", "sites"],
    },
  };

  return <Column {...config} />;
};

export default AcquisitionsChart;
