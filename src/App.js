import React, { useState } from "react";
import { Container, Navbar, Button, Card, Row, Col } from "react-bootstrap";
import InputForm from "./Components/InputForm";
import PredictionTable from "./Components/PredictionTable";
import PredictionChart from "./Components/PredictionChart"; // Import PredictionChart
import { trainModel, predict } from "./utils/mlUtils"; // Import mlUtils
import "./Styles.css";

const App = () => {
  const [data, setData] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleAddData = (formData) => {
    setData([
      ...data,
      {
        input: data.length + 1, // Example x-axis data
        output: parseFloat(formData.totalStudents),
        ...formData,
      },
    ]);
  };

  const handleTrainModel = async () => {
    const trainedModel = await trainModel(data);
    setModel(trainedModel);

    const newPredictions = data.map((d) => {
      const predictedEnrollment = predict(trainedModel, d.input + 1);
      return {
        courseCode: d.courseCode,
        predictedEnrollment: Math.round(predictedEnrollment),
        predictedSections: Math.ceil(predictedEnrollment / (d.maxStudentsPerSection || 30)),
      };
    });

    setPredictions(newPredictions);
  };

  return (
    <>
      {/* Navbar */}
       <Navbar bg="dark" variant="dark" style={{ backgroundColor: '#333' }}>
        <Container>
          <Navbar.Brand href="#">Course Section Forecasting</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        <Row>
          {/* Form Section */}
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-primary text-white text-center">
                Add Enrollment Data
              </Card.Header>
              <Card.Body>
                <InputForm onAddData={handleAddData} />
              </Card.Body>
            </Card>
            <Button
              onClick={handleTrainModel}
              variant="success"
              className="w-100 mt-3"
            >
              Train Model
            </Button>
          </Col>

          {/* Predictions Section */}
          <Col md={8}>
            {predictions.length > 0 && (
              <>
                {/* Prediction Table */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-secondary text-white text-center">
                    Predictions
                  </Card.Header>
                  <Card.Body>
                    <PredictionTable predictions={predictions} />
                  </Card.Body>
                </Card>

                {/* Prediction Chart */}
                <Card className="shadow-sm">
                  <Card.Header className="bg-secondary text-white text-center">
                    Predicted Enrollment and Sections by Course
                  </Card.Header>
                  <Card.Body>
                    <PredictionChart predictions={predictions} /> {/* Use PredictionChart */}
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
