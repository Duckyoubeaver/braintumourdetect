// Scans.tsx
'use client';

import Popup from './Popup';
import s from './Scans.module.css';
import React, { useState } from 'react';

const Scans = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScan, setSelectedScan] = useState({ name: '', dateAdded: '' });

  const handlePopupToggle = (name: string, dateAdded: string) => {
    setSelectedScan({ name, dateAdded });
    setShowPopup(!showPopup);
  };

  // Dummy data for demonstration
  const scans = [
    { name: 'Scan 1', dateAdded: '2024-05-01' },
    { name: 'Scan 2', dateAdded: '2024-05-05' },
    { name: 'Scan 3', dateAdded: '2024-05-05' },
    { name: 'Scan 4', dateAdded: '2024-05-05' },
    { name: 'Scan 5', dateAdded: '2024-05-05' },
    { name: 'Scan 6', dateAdded: '2024-05-05' },
    { name: 'Scan 7', dateAdded: '2024-05-05' },
    { name: 'Scan 8', dateAdded: '2024-05-05' },
    { name: 'Scan 9', dateAdded: '2024-05-05' },
    { name: 'Scan 10', dateAdded: '2024-05-05' },
    { name: 'Scan 11', dateAdded: '2024-05-05' }

    // Add more scan data as needed
  ];

  return (
    <div className={`${s.background} w-screen h-screen`}>
      <table
        className={`${s.scanTable} ${s.blackBackground} ${s.interFont} ${s.smaller}`}
      >
        <div className={`font-medium my-6 mx-2 mr-0`}>
          Uploaded Brain Scans Stub
        </div>

        <tbody>
          {scans.map((scan, index) => (
            <tr key={index}>
              <td>
                <button
                  className={`${s.scanButton} ${s.smallerButton}`}
                  onClick={() => handlePopupToggle(scan.name, scan.dateAdded)}
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
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          name={selectedScan.name}
          dateAdded={selectedScan.dateAdded}
        />
      )}
    </div>
  );
};

export default Scans;
