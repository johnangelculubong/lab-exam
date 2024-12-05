import * as tf from "@tensorflow/tfjs";

export const trainModel = async (data) => {
  const inputs = data.map((d) => d.input);
  const outputs = data.map((d) => d.output);

  const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
  const outputTensor = tf.tensor2d(outputs, [outputs.length, 1]);

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss: "meanSquaredError",
  });

  await model.fit(inputTensor, outputTensor, { epochs: 100 });

  return model;
};

export const predict = (model, input) => {
  const inputTensor = tf.tensor2d([input], [1, 1]);
  const outputTensor = model.predict(inputTensor);
  return outputTensor.dataSync()[0];
};
