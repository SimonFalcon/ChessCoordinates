import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Heatmap } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const HeatmapChart = ({ data }) => {
  const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const datasets = Object.keys(data).map((row, rowIndex) => {
    return {
      label: 8 - rowIndex,
      data: Object.values(data[row]).map(value => (value === undefined ? 0 : value)),
      backgroundColor: (context) => {
        const value = context.raw;
        const alpha = Math.min(Math.abs(value) / 30, 1); // Normalize value between -30 and 30
        const color = value > 0 ? `rgba(0, 255, 0, ${alpha})` : `rgba(255, 0, 0, ${alpha})`;
        return value === 0 ? 'rgba(255, 255, 255, 1)' : color;
      }
    };
  });

  return (
    <div>
      <Heatmap
        data={{
          labels,
          datasets
        }}
        options={{
          scales: {
            y: {
              reverse: true // To match the 8 to 1 order
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Value: ${context.raw}`;
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default HeatmapChart;
