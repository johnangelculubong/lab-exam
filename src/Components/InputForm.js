import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";


const InputForm = ({ onAddData }) => {
  const [semester, setSemester] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [maxStudentsPerSection, setMaxStudentsPerSection] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddData({ semester, courseCode, totalStudents, maxStudentsPerSection });
    setSemester("");
    setCourseCode("");
    setTotalStudents("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Semester</Form.Label>
        <Form.Control
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="e.g., 2022-2"
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Course Code</Form.Label>
        <Form.Control
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="e.g., CS101"
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Total Students Enrolled</Form.Label>
        <Form.Control
          type="number"
          value={totalStudents}
          onChange={(e) => setTotalStudents(e.target.value)}
          placeholder="e.g., 90"
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Max Students Per Section</Form.Label>
        <Form.Control
          type="number"
          value={maxStudentsPerSection}
          onChange={(e) => setMaxStudentsPerSection(e.target.value)}
          placeholder="Default: 30"
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-3 w-100">
        Add Data
      </Button>
    </Form>
  );
};

export default InputForm;
