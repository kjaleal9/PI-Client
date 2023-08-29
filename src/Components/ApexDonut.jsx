import React from "react";
import Chart from "react-apexcharts";

const ApexDonut = () => {
  const series = [938, 1350, 929, 2004, 927, 62];
  const labels = [
    "Pre Rinse",
    "Caustic",
    "Mid Rinse",
    "HotRinse",
    "Final Rinse",
    "Final Drain",
  ];

  return (
    <Chart
      series={series}
      options={{
        chart: {
          events: {
            dataPointSelection: function (event, chartContext, config) {
              // console.log(chartContext);
              // console.log(event);
              // console.log(config);
            },
          },
        },
        labels,
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10,
            },
            donut: {
              size: "70%",
              background: "transparent",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "75px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: undefined,
                  offsetY: -10,
                  formatter: function (val) {
                    console.log(val);
                    return val;
                  },
                },
                value: {
                  show: true,
                  fontSize: "25px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    console.log(val);
                    return val;
                  },
                },
                total: {
                  show: true,
                  showAlways: true,
                  label: "Total CIP Time",
                  fontSize: "20px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#373d3f",
                  formatter: function (w) {
                    console.log(w);
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
      }}
      type="donut"
      // height="325px"
      width={500}
    />
  );
};

export default ApexDonut;
