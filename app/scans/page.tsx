import React from 'react';
import s from './Scans.module.css';

const Scans = () => {
  // Dummy data for demonstration
  const scans = [
    { name: 'Scan 1', dateAdded: '2024-05-01' },
    { name: 'Scan 2', dateAdded: '2024-05-05' },
    { name: 'Scan 3', dateAdded: '2024-05-08' },
    { name: 'Scan 4', dateAdded: '2024-05-01' },
    { name: 'Scan 5', dateAdded: '2024-05-05' },
    { name: 'Scan 6', dateAdded: '2024-05-01' },
    { name: 'Scan 7', dateAdded: '2024-05-05' },
    { name: 'Scan 8', dateAdded: '2024-05-05' },
    { name: 'Scan 9', dateAdded: '2024-05-01' },
    { name: 'Scan 10', dateAdded: '2024-05-05' }
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
                <button className={`${s.scanButton} ${s.smallerButton}`}>
                  {scan.name}
                  <br />
                  <span className={s.dateAdded}>{scan.dateAdded}</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scans;
