import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PredictionChart = ({ predictions }) => {
  // Prepare data for the chart
  const chartData = {
    labels: predictions.map((prediction) => prediction.courseCode), // Course codes as labels
    datasets: [
      {
        label: 'Predicted Enrollment',
        data: predictions.map((prediction) => prediction.predictedEnrollment),
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color for predicted enrollment bars
        borderColor: 'rgba(54, 162, 235, 1)', // Blue border color
        borderWidth: 1,
      },
      {
        label: 'Predicted Sections',
        data: predictions.map((prediction) => prediction.predictedSections),
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red color for predicted sections bars
        borderColor: 'rgba(255, 99, 132, 1)', // Red border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Predicted Enrollment and Sections by Course',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PredictionChart;
