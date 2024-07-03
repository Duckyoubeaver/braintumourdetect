import React, { useState, useEffect } from 'react';
import s from './Scans.module.css';

interface PopupProps {
  onClose: () => void;
  name: string;
  dateAdded: string;
  url: string;
}

interface ModelOutput {
  class: number;
  confidence: number;
}

const Popup: React.FC<PopupProps> = ({ onClose, name, dateAdded, url }) => {
  const [modelOutput, setModelOutput] = useState<ModelOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inferenceError, setInferenceError] = useState<string | null>(null);

  useEffect(() => {
    const runInference = async () => {
      setLoading(true);
      setInferenceError(null);
      try {
        // Fetch the image file
        const imageResponse = await fetch(url);
        const imageBlob = await imageResponse.blob();

        // Create form data and append the image
        const formData = new FormData();
        formData.append('image', imageBlob, 'image.jpg');

        // Send the form data to the API
        const response = await fetch('/api/run-model', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Server error: ${errorData.message || response.statusText}`
          );
        }

        const result = await response.json();
        setModelOutput(result.output);
      } catch (error) {
        console.error('Error running the model:', error);
        setInferenceError(
          error instanceof Error ? error.message : String(error)
        );
      } finally {
        setLoading(false);
      }
    };

    runInference();
  }, [url]); // Dependency array includes url to rerun inference if the url changes

  return (
    <div className={s.popupOverlay} onClick={onClose}>
      <div className={s.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* <button className={s.closeButton} onClick={onClose}>
          Close
        </button> */}
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
              {modelOutput ? (
                <>
                  <div className={s.statistic}>
                    <span className={s.largeNumber}>{modelOutput.class}</span>
                    <span className={s.subheading}>Predicted Class</span>
                  </div>
                  <div className={s.statistic}>
                    <span className={s.largeNumber}>
                      {(modelOutput.confidence * 100).toFixed(2)}%
                    </span>
                    <span className={s.subheading}>Confidence</span>
                  </div>
                </>
              ) : (
                <p>Running inference...</p>
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
