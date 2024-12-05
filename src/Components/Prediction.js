import React from "react";
import { Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


// Register required components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Predictions = ({ predictions }) => {
  const chartData = {
    labels: predictions.map((p) => p.courseCode),
    datasets: [
      {
        label: "Predicted Enrollment",
        data: predictions.map((p) => p.predictedEnrollment),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Predicted Sections",
        data: predictions.map((p) => p.predictedSections),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Predicted Enrollment</th>
            <th>Predicted Sections</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p, idx) => (
            <tr key={idx}>
              <td>{p.courseCode}</td>
              <td>{p.predictedEnrollment}</td>
              <td>{p.predictedSections}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default Predictions;
