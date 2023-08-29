import React from "react";
import { timeParse } from "d3";
import { Line } from "@ant-design/plots";

const parseTime2 = timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

const CustomLineChart = ({ ppData }) => {
  const config = React.useMemo(
    () => ({
      data: ppData,
      xField: "x",
      yField: "y",
      seriesField: "device",
      annotations: [
        {
          type: "line",
          start: ["min", 180],
          end: [parseTime2("2023-07-28T12:15:00.950Z"), 180],
          style: {
            stroke: "red", // Line color
            lineWidth: 1, // Line width
            lineDash: [4, 4], // Line dash pattern (optional)
          },
          text: {
            content: "Reference Line", // Text content of the annotation (optional)
            position: "start", // Position of the text along the line (optional)
            offsetX: 10, // X offset of the text from the line (optional)
            offsetY: -10, // Y offset of the text from the line (optional)
            style: {
              fill: "blue", // Text fill color (optional)
              fontSize: 12, // Text font size (optional)
            },
          },
        },
      ],
      xAxis: {
        nice: true,
        type: "time",
        tickCount: 10,
        mask: "hh:mm:ss A",
      },
      legend: {
        position: "top",
      },
      smooth: true,
      animation: {
        appear: {
          animation: "path-in",
          duration: 5000,
        },
      },
      onReady: (plot) => {
        plot.on("legend-item-name:click", (...args) => {
          console.log(...args);
        });
      },
    }),
    [ppData]
  );
  return <Line {...config} />;
};

export default CustomLineChart;
