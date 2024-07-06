//ONNX MODEL
// import { NextRequest, NextResponse } from 'next/server';
// import { InferenceSession, Tensor } from 'onnxruntime-node';
// import sharp from 'sharp';
// import fs from 'fs/promises';
// import path from 'path';
// import * as tf from '@tensorflow/tfjs';

// const modelPath = path.join(process.cwd(), 'public', 'onnx_model.onnx');

// export async function POST(req: NextRequest) {
//   try {
//     console.log('Hello from line 1 in try block');
//     const formData = await req.formData();
//     const image = formData.get('image') as Blob | null;

//     if (!image) {
//       return NextResponse.json(
//         { message: 'Missing image file' },
//         { status: 400 }
//       );
//     }

//     console.log('Image received, size:', image.size);

//     const arrayBuffer = await image.arrayBuffer();
//     const imageData = await preprocessImage(arrayBuffer);
//     console.log('Image preprocessed, tensor shape:', [1, 3, 224, 224]);

//     console.log('Loading ONNX model from:', modelPath);
//     const modelBuffer = await fs.readFile(modelPath);
//     const session = await InferenceSession.create(modelBuffer);
//     console.log('ONNX model loaded successfully');

//     const tensor = new Tensor('float32', imageData, [1, 3, 224, 224]);

//     console.log('Running inference');
//     const feeds = {
//       'input.1': tensor // Ensure this matches the model's expected input name
//     };
//     const results = await session.run(feeds);
//     console.log('Inference completed');

//     // Inspect the output names
//     const outputNames = session.outputNames;
//     console.log('Output names:', outputNames);

//     // Access the output data using the correct output name
//     const output = results[outputNames[0]].data as Float32Array;
//     console.log('Model raw output:', output);

//     const processedOutput = processModelOutput(output);

//     console.log('Processed model output:', processedOutput);

//     return NextResponse.json({ output: processedOutput });
//   } catch (error) {
//     console.error('Error in run-model API:', error);
//     return NextResponse.json(
//       {
//         message: 'Error running the model',
//         error: error instanceof Error ? error.message : String(error),
//         stack:
//           process.env.NODE_ENV === 'development' && error instanceof Error
//             ? error.stack
//             : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// async function preprocessImage(
//   arrayBuffer: ArrayBuffer
// ): Promise<Float32Array> {
//   try {
//     const image = sharp(Buffer.from(arrayBuffer));
//     const { data, info } = await image
//       .resize(224, 224, { fit: 'cover' })
//       .raw()
//       .toBuffer({ resolveWithObject: true });

//     const float32Data = new Float32Array(3 * 224 * 224);
//     for (let i = 0; i < data.length; i += 3) {
//       float32Data[i / 3] = (data[i] / 255 - 0.485) / 0.229;
//       float32Data[i / 3 + 224 * 224] = (data[i + 1] / 255 - 0.456) / 0.224;
//       float32Data[i / 3 + 2 * 224 * 224] = (data[i + 2] / 255 - 0.406) / 0.225;
//     }
//     return float32Data;
//   } catch (error) {
//     console.error('Error preprocessing image:', error);
//     throw error;
//   }
// }

// function processModelOutput(output: Float32Array): {
//   class: number;
//   confidence: number;
// } {
//   const logit = output[0];

//   // Apply sigmoid to get probability
//   const probability = 1 / (1 + Math.exp(-logit));

//   // Determine the class based on the probability
//   const predictedClass = probability > 0.5 ? 1 : 0;

//   return { class: predictedClass, confidence: probability };
// }

//Tensorflow.js
import { NextRequest, NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs';
import sharp from 'sharp';

// Update the modelPath to use a full URL
const modelPath =
  'https://yyxgbfilifruovbkrmib.supabase.co/storage/v1/object/public/model/tfs/model.json?t=2024-07-04T11%3A12%3A33.920Z';

let model: tf.LayersModel | null = null;

async function loadModel() {
  if (model) return model;

  console.log('Starting model loading process...');
  console.log('Model path:', modelPath);
  try {
    console.log('Attempting to load model using tf.loadLayersModel');
    model = await tf.loadLayersModel(modelPath);
    console.log('TensorFlow.js model loaded successfully');

    // Log some information about the model
    console.log(
      'Model input shapes:',
      model.inputs.map((input) => input.shape)
    );
    console.log(
      'Model output shapes:',
      model.outputs.map((output) => output.shape)
    );
    console.log('Model weights:', model.weights.length);

    return model;
  } catch (error) {
    console.error('Error loading the model:', error);
    if (error instanceof TypeError) {
      console.error('TypeError details:', (error as TypeError).message);
    } else {
      console.error('Error type:', (error as Error).constructor.name);
      console.error('Error message:', (error as Error).message);
    }
    throw error;
  }
}

export async function POST(req: NextRequest) {
  console.log('POST request received');
  try {
    console.log('Parsing form data...');
    const formData = await req.formData();
    const image = formData.get('image') as Blob | null;

    if (!image) {
      console.log('No image file found in form data');
      return NextResponse.json(
        { message: 'Missing image file' },
        { status: 400 }
      );
    }

    console.log('Image file received, size:', image.size);

    const arrayBuffer = await image.arrayBuffer();
    console.log(
      'Image converted to ArrayBuffer, length:',
      arrayBuffer.byteLength
    );

    console.log('Starting image preprocessing...');
    const imageData = await preprocessImage(arrayBuffer);
    console.log('Image preprocessing completed');
    console.log('Preprocessed image tensor shape:', [1, 224, 224, 3]);

    console.log('Checking if model is loaded...');
    if (!model) {
      console.log('Model not loaded, loading now...');
      await loadModel();
    }
    console.log('Model is ready');

    console.log('Creating tensor for model input...');
    const tensor = tf.tensor4d(imageData, [1, 224, 224, 3], 'float32');
    console.log('Tensor created successfully');

    console.log('Running inference...');
    const results = model!.predict(tensor) as tf.Tensor;
    console.log('Inference completed');

    console.log('Retrieving output data...');
    const outputArray = await results.data();
    console.log('Raw model output:', outputArray);

    console.log('Processing model output...');
    const processedOutput = processModelOutput(outputArray as Float32Array);
    console.log('Processed model output:', processedOutput);

    console.log('Preparing response...');
    return NextResponse.json({ output: processedOutput });
  } catch (error) {
    console.error('Error in run-model API:', error);
    return NextResponse.json(
      {
        message: 'Error running the model',
        error: error instanceof Error ? error.message : String(error),
        stack:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? (error as Error).stack
            : undefined
      },
      { status: 500 }
    );
  } finally {
    if (model) {
      console.log('Disposing of the model to prevent memory leaks...');
      model.dispose();
      model = null;
    }
  }
}

async function preprocessImage(
  arrayBuffer: ArrayBuffer
): Promise<Float32Array> {
  console.log('Starting image preprocessing');
  try {
    const image = sharp(Buffer.from(arrayBuffer));
    const { data, info } = await image
      .resize(224, 224, { fit: 'cover' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    console.log('Image resized to 224x224');
    console.log('Raw image data length:', data.length);
    console.log('Image metadata:', info);

    console.log('Converting image data to Float32Array...');
    const float32Data = new Float32Array(224 * 224 * 3);
    for (let i = 0; i < data.length; i += 3) {
      float32Data[i / 3] = (data[i] / 255 - 0.485) / 0.229;
      float32Data[i / 3 + 224 * 224] = (data[i + 1] / 255 - 0.456) / 0.224;
      float32Data[i / 3 + 2 * 224 * 224] = (data[i + 2] / 255 - 0.406) / 0.225;
    }
    console.log('Image data converted to Float32Array');
    return float32Data;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
}

function processModelOutput(output: Float32Array): {
  class: number;
  confidence: number;
} {
  console.log('Processing model output');
  const logit = output[0];
  console.log('Logit value:', logit);

  const probability = 1 / (1 + Math.exp(-logit));
  console.log('Probability value:', probability);

  const predictedClass = probability > 0.5 ? 1 : 0;
  console.log('Predicted class:', predictedClass);

  return { class: predictedClass, confidence: probability };
}
