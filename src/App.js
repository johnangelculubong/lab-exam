import React, { useState } from "react";
import { Container, Navbar, Button, Card, Row, Col } from "react-bootstrap";
import InputForm from "./Components/InputForm";
import PredictionTable from "./Components/PredictionTable";
import PredictionChart from "./Components/PredictionChart";
import { trainModel, predict } from "./utils/mlUtils";
import "./Styles.css";

const App = () => {
  const [data, setData] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleAddData = (formData) => {
    setData([
      ...data,
      {
        input: data.length + 1,
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
    <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", color: "white" }}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="header" style={{  minHeight: "100px", fontSize: '50px' }}>
        <Container>
          <Navbar.Brand href="#" className="mx-auto">Course Section Forecasting</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        <Row>
          {/* Form Section */}
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="text-#333 text-center">
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
                  <Card.Header className=" text-#333 text-center">
                    PREDICTIONS
                  </Card.Header>
                  <Card.Body>
                    <PredictionTable predictions={predictions} />
                  </Card.Body>
                </Card>

                {/* Prediction Chart */}
                <Card className="shadow-sm">
                  <Card.Header className=" text-#333 text-center">
                    Predicted Enrollment and Sections by Course
                  </Card.Header>
                  <Card.Body>
                    <PredictionChart predictions={predictions} />
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
