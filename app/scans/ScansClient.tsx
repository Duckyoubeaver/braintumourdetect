'use client';

import Popup from './Popup';
import s from './Scans.module.css';
import React, { useState } from 'react';

interface Scan {
  name: string;
  dateAdded: string;
  url: string;
}

interface ScansClientProps {
  initialScans: Scan[];
}

const ScansClient: React.FC<ScansClientProps> = ({ initialScans }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  const handlePopupToggle = (scan: Scan) => {
    setSelectedScan(scan);
    setShowPopup(!showPopup);
  };

  if (initialScans.length === 0) {
    return <div>No scans available.</div>;
  }

  return (
    <div className={`${s.background} w-screen h-screen`}>
      <table
        className={`${s.scanTable} ${s.blackBackground} ${s.interFont} ${s.smaller} w-full`}
      >
        <thead>
          <tr>
            <th className={`font-medium text-lg text-left pl-5 pt-6 pb-4`}>
              Uploaded Brain Scans
            </th>
          </tr>
        </thead>
        <tbody>
          {initialScans.map((scan, index) => (
            <tr key={index}>
              <td className="pl-4">
                <button
                  className={`${s.scanButton} ${s.smallerButton} text-left w-full`}
                  onClick={() => handlePopupToggle(scan)}
                >
                  {scan.name}
                  <br />
                  <span className={s.dateAdded}>{scan.dateAdded}</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && selectedScan && (
        <Popup
          onClose={() => setShowPopup(false)}
          name={selectedScan.name}
          dateAdded={selectedScan.dateAdded}
          url={selectedScan.url}
        />
      )}
    </div>
  );
};

export default ScansClient;
