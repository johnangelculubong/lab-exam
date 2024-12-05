import * as tf from '@tensorflow/tfjs';
import React from 'react';


const TrainModelButton = ({ data, setModel }) => {
  const trainModel = async () => {
    // Prepare data for TensorFlow.js
    const inputs = data.map((d) => d.totalStudents); // Use total students as input
    const labels = inputs.map((input) => input); // (Dummy labels, change as needed)

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    // Define a simple regression model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

    model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.meanSquaredError,
    });

    // Train the model
    await model.fit(inputTensor, labelTensor, { epochs: 50 });

    console.log('Model Trained');
    setModel(model);
  };

  return (
    <button onClick={trainModel} className="btn btn-success">
      Train Model
    </button>
  );
};

export default TrainModelButton;
