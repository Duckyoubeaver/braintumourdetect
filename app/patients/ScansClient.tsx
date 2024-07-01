// // components/ScansClient.tsx
// 'use client';

// import Popup from './Popup';
// import s from './Scans.module.css';
// import React, { useState, useEffect } from 'react';

// interface Scan {
//   name: string;
//   dateAdded: string;
//   url: string;
// }

// interface ScansClientProps {
//   initialScans: Scan[];
// }

// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true
//   }).format(date);
// };

// const ScansClient: React.FC<ScansClientProps> = ({ initialScans }) => {
//   const [scans, setScans] = useState<Scan[]>(initialScans);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

//   useEffect(() => {
//     console.log('Initial scans:', initialScans);
//     setScans(initialScans);
//   }, [initialScans]);

//   const handlePopupToggle = (scan: Scan) => {
//     setSelectedScan(scan);
//     setShowPopup(!showPopup);
//   };

//   if (scans.length === 0) {
//     return <div>No scans available for this patient.</div>;
//   }

//   return (
//     <div className="w-screen min-h-screen bg-white">
//       <table
//         className={`${s.scanTable} ${s.blackBackground} ${s.interFont} ${s.smaller} w-full`}
//       >
//         <thead>
//           <tr>
//             <th className={`font-medium text-lg text-left pl-5 pt-6 pb-4`}>
//               Patient's Brain Scans
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {scans.map((scan, index) => (
//             <tr key={index}>
//               <td className="pl-4">
//                 <button
//                   className={`${s.scanButton} ${s.smallerButton} text-left w-full`}
//                   onClick={() => handlePopupToggle(scan)}
//                 >
//                   {scan.name}
//                   <br />
//                   <span className={s.dateAdded}>
//                     {formatDate(scan.dateAdded)}
//                   </span>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {showPopup && selectedScan && (
//         <Popup
//           onClose={() => setShowPopup(false)}
//           name={selectedScan.name}
//           dateAdded={selectedScan.dateAdded}
//           url={selectedScan.url}
//         />
//       )}
//     </div>
//   );
// };

// export default ScansClient;

// components/ScansClient.tsx
'use client';

import Popup from './Popup';
import s from './Scans.module.css';
import React, { useState, useEffect } from 'react';

interface Scan {
  name: string;
  dateAdded: string;
  url: string;
}

interface ScansClientProps {
  initialScans: Scan[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date);
};

const ScansClient: React.FC<ScansClientProps> = ({ initialScans }) => {
  const [scans, setScans] = useState<Scan[]>(initialScans);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  useEffect(() => {
    console.log('Initial scans:', initialScans);
    setScans(initialScans);
  }, [initialScans]);

  const handlePopupToggle = (scan: Scan) => {
    setSelectedScan(scan);
    setShowPopup(!showPopup);
  };

  if (scans.length === 0) {
    return (
      <div className="text-center">No scans available for this patient.</div>
    );
  }

  return (
    <div className="w-full bg-white">
      <table
        className={`${s.scanTable} ${s.blackBackground} ${s.interFont} ${s.smaller} w-full`}
      >
        <thead>
          <tr>
            <th className="font-medium text-lg text-left pl-5 pt-6 pb-4">
              Patient's Brain Scans
            </th>
          </tr>
        </thead>
        <tbody>
          {scans.map((scan, index) => (
            <tr key={index}>
              <td className="pl-4">
                <button
                  className={`${s.scanButton} ${s.smallerButton} text-left w-full`}
                  onClick={() => handlePopupToggle(scan)}
                >
                  {scan.name}
                  <br />
                  <span className={s.dateAdded}>
                    {formatDate(scan.dateAdded)}
                  </span>
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
