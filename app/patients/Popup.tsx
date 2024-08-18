import React, { useState, useEffect } from 'react';
import s from './Scans.module.css'; // Make sure this path is correct for your CSS file

interface PopupProps {
  onClose: () => void;
  name: string;
  dateAdded: string;
  url: string;
}

interface ModelOutput {
  binaryPrediction: string;
  binaryProbability: number;
  tumorType?: number;
  probabilities?: number[];
}

const tumorTypes = ['Glioma', 'Meningioma', 'Pituitary'];

const Popup: React.FC<PopupProps> = ({ onClose, name, dateAdded, url }) => {
  const [modelOutput, setModelOutput] = useState<ModelOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inferenceError, setInferenceError] = useState<string | null>(null);

  useEffect(() => {
    const runInference = async () => {
      setLoading(true);
      setInferenceError(null);
      console.log('Starting inference...');
      try {
        const response = await fetch(url);
        console.log('Fetched image from URL:', url);
        const imageBlob = await response.blob();

        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg');

        const flaskResponse = await fetch(
          'https://neurovision-ebspx5jtpa-ts.a.run.app/predict',
          {
            method: 'POST',
            body: formData
          }
        );

        if (!flaskResponse.ok) {
          throw new Error('Error making prediction request');
        }

        const predictionResult = await flaskResponse.json();
        console.log('Prediction result:', predictionResult);

        setModelOutput({
          binaryPrediction: predictionResult.binary_prediction,
          binaryProbability: predictionResult.binary_probability,
          tumorType: predictionResult.tumor_type,
          probabilities: predictionResult.probabilities
        });
      } catch (error) {
        console.error('Error running inference:', error);
        setInferenceError(
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
        console.log('Inference completed');
      }
    };

    runInference();
  }, [url]);

  const renderBarChart = (probabilities?: number[]) => {
    if (!probabilities) return null;

    const maxProbability = Math.max(...probabilities);
    const chartHeight = 130; // Slightly reduced to accommodate text above bars
    const maxBarHeight = chartHeight * 0.9; // 90% of chart height as maximum

    return (
      <div className={s.barChart}>
        {probabilities.map((prob, index) => {
          const barHeight = Math.min(
            (prob / maxProbability) * chartHeight,
            maxBarHeight
          );
          return (
            <div key={index} className={s.barChartItem}>
              <div
                className={s.bar}
                style={{
                  height: `${barHeight}px`,
                  minHeight: '20px'
                }}
              >
                <span className={s.barText}>{Math.round(prob * 100)}%</span>
              </div>
              <div className={s.barLabel}>{tumorTypes[index]}</div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={s.popupOverlay} onClick={onClose}>
      <div className={s.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={s.popupLayout}>
          <div className={s.imageContainer}>
            <img
              src={url}
              alt={name}
              className={s.popupImage}
              onError={(e) => console.error('Image failed to load:', e)}
            />
          </div>
          <div className={s.infoContainer}>
            <div className={s.shadowBox}>
              <h3>Inference Statistics</h3>
              {loading ? (
                <p>Running inference...</p>
              ) : modelOutput ? (
                <>
                  <div className={s.statistic}>
                    <span className={s.largeNumber}>
                      {modelOutput.binaryPrediction === 'yes'
                        ? 'Tumor'
                        : 'No Tumor'}
                    </span>
                    <span className={s.subheading}>Binary Prediction</span>
                  </div>
                  <div className={s.statistic}>
                    <span className={s.largeNumber}>
                      {Math.round(modelOutput.binaryProbability * 100)}%
                    </span>
                    <span className={s.subheading}>Binary Probability</span>
                  </div>
                  {modelOutput.tumorType !== undefined && (
                    <>
                      <div className={s.statistic}>
                        <span className={s.largeNumber}>
                          {tumorTypes[modelOutput.tumorType]}
                        </span>
                        <span className={s.subheading}>Tumor Type</span>
                      </div>
                      <div className={s.statistic}>
                        <span className={s.largeNumber}>Probabilities</span>
                        {renderBarChart(modelOutput.probabilities)}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p>No inference results available</p>
              )}
              <p className={s.disclaimer}>
                Our model may make mistakes. Please use results with caution.
              </p>
              {inferenceError && (
                <p className={s.error}>Error: {inferenceError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
