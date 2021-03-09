import React from "react";
import { Doughnut } from "react-chartjs-2";
import { StyledMatchPlotsContainer } from "../../../globalStyles";

const ShotTypeDonutPlot = ({ jump, layup, dunk, hook }) => {
  const colours = ["#4BC0C0", "#36A2EB", "#FFCE56", "#FF6384"];

  const data = {
    labels: ["Jump", "Layup", "Dunk", "Hook"],
    datasets: [
      {
        data: [jump, layup, dunk, hook],
        backgroundColor: colours,
        hoverBackgroundColor: colours,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        color: "white",
        textAlign: "center",
        formatter: function (value) {
          if (value !== 0) {
            return value;
          }
          return "";
        },
      },
    },
  };

  return (
    <StyledMatchPlotsContainer doughnut>
      <Doughnut data={data} options={options} />
    </StyledMatchPlotsContainer>
  );
};

export default ShotTypeDonutPlot;
