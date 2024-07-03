import { NextRequest, NextResponse } from 'next/server';
import * as ort from 'onnxruntime-node';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const modelPath = path.join(process.cwd(), 'public', 'onnx_model.onnx');

export async function POST(req: NextRequest) {
  try {
    console.log('Hello from line 1 in try block');
    const formData = await req.formData();
    const image = formData.get('image') as Blob | null;

    if (!image) {
      return NextResponse.json(
        { message: 'Missing image file' },
        { status: 400 }
      );
    }

    console.log('Image received, size:', image.size);

    const arrayBuffer = await image.arrayBuffer();
    const imageData = await preprocessImage(arrayBuffer);
    console.log('Image preprocessed, tensor shape:', [1, 3, 224, 224]);

    console.log('Loading ONNX model from:', modelPath);
    const modelBuffer = await fs.readFile(modelPath);
    const session = await ort.InferenceSession.create(modelBuffer);
    console.log('ONNX model loaded successfully');

    const tensor = new ort.Tensor('float32', imageData, [1, 3, 224, 224]);

    console.log('Running inference');
    const feeds = {
      'input.1': tensor // Ensure this matches the model's expected input name
    };
    const results = await session.run(feeds);
    console.log('Inference completed');

    // Inspect the output names
    const outputNames = session.outputNames;
    console.log('Output names:', outputNames);

    // Access the output data using the correct output name
    const output = results[outputNames[0]].data as Float32Array;
    console.log('Model raw output:', output);

    const processedOutput = processModelOutput(output);

    console.log('Processed model output:', processedOutput);

    return NextResponse.json({ output: processedOutput });
  } catch (error) {
    console.error('Error in run-model API:', error);
    return NextResponse.json(
      {
        message: 'Error running the model',
        error: error instanceof Error ? error.message : String(error),
        stack:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? error.stack
            : undefined
      },
      { status: 500 }
    );
  }
}

async function preprocessImage(
  arrayBuffer: ArrayBuffer
): Promise<Float32Array> {
  try {
    const image = sharp(Buffer.from(arrayBuffer));
    const { data, info } = await image
      .resize(224, 224, { fit: 'cover' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const float32Data = new Float32Array(3 * 224 * 224);
    for (let i = 0; i < data.length; i += 3) {
      float32Data[i / 3] = (data[i] / 255 - 0.485) / 0.229;
      float32Data[i / 3 + 224 * 224] = (data[i + 1] / 255 - 0.456) / 0.224;
      float32Data[i / 3 + 2 * 224 * 224] = (data[i + 2] / 255 - 0.406) / 0.225;
    }
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
  const logit = output[0];

  // Apply sigmoid to get probability
  const probability = 1 / (1 + Math.exp(-logit));

  // Determine the class based on the probability
  const predictedClass = probability > 0.5 ? 1 : 0;

  return { class: predictedClass, confidence: probability };
}
