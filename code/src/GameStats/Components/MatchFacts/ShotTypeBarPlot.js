import React from 'react';
import { Bar } from 'react-chartjs-2';
import { StyledMatchPlotsContainer } from '../../../globalStyles';

const ShotTypeBarPlot = ({ jump, layup, dunk, hook }) => {
  const doesHaveOT = !jump.includes(undefined);
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', ...doesHaveOT ? ['OT'] : []],
    datasets: [
      {
        label: 'Jump',
        backgroundColor: 'rgba(75, 192, 192, 1)',
        data: jump
      },
      {
        label: 'Layup',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        data: layup
      },
      {
        label: 'Dunk',
        backgroundColor: 'rgba(255, 206, 86, 1)',
        data: dunk
      },
      {
        label: 'Hook',
        backgroundColor: 'rgba(255, 99, 132, 1)',
        data: hook
      },
    ]
  };

  const options = {
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          drawOnChartArea: false
        },
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          drawOnChartArea: false
        },
      }]
    },

    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        color: 'white',
        textAlign: 'center',
        formatter: function (value) {
          if (value !== 0) {
            return value;
          }
          return '';
        }
      }
    }
  }

  return (
    <StyledMatchPlotsContainer>
      <Bar
        data={data}
        options={options}
      />
    </StyledMatchPlotsContainer>
  );
}

export default ShotTypeBarPlot;