export async function createTFJSHandDetector() {
  const handpose = await import("@tensorflow-models/hand-pose-detection");
  const tf = await import("@tensorflow/tfjs-core");
  await import("@tensorflow/tfjs-backend-webgl");

  await tf.setBackend("webgl");
  await tf.ready();

  const model = handpose.SupportedModels.MediaPipeHands;
  return await handpose.createDetector(model, {
    runtime: "tfjs",
    modelType: "lite",
  });
}
