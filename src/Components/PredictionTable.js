import React from "react";
import { Table } from "react-bootstrap";

// PredictionTable Component to display the predictions
const PredictionTable = ({ predictions }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Predicted Enrollment</th>
            <th>Predicted Sections</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.courseCode}</td>
              <td>{prediction.predictedEnrollment}</td>
              <td>{prediction.predictedSections}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PredictionTable;
