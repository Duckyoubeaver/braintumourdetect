'use client';

import Popup from './Popup';
import s from './Scans.module.css';
import React, { useState, useEffect } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaSpinner } from 'react-icons/fa';
import { usePathname } from 'next/navigation'; // Import usePathname

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
  const [loading, setLoading] = useState<string | null>(null); // Track which scan is being deleted
  const pathname = usePathname(); // Use usePathname to get the current path

  useEffect(() => {
    setScans(initialScans);
  }, [initialScans]);

  const handlePopupToggle = (scan: Scan) => {
    setSelectedScan(scan);
    setShowPopup(!showPopup);
  };

  // Delete the scan
  const handleDelete = async (scan: Scan) => {
    if (window.confirm(`Are you sure you want to delete ${scan.name}?`)) {
      setLoading(scan.name); // Set loading state to the name of the scan being deleted
      try {
        // Extract folder path from URL for the custom API request
        const folderPath = pathname
          ? pathname.split('/').pop() || 'default-folder'
          : 'default-folder';

        // Make a DELETE request to the custom API to delete the scan
        const response = await fetch(
          `/api/delete-image?folderPath=${encodeURIComponent(
            folderPath
          )}&fileName=${encodeURIComponent(scan.name)}`,
          {
            method: 'DELETE'
          }
        );

        // If the response is not ok, throw an error
        if (!response.ok) {
          throw new Error('Failed to delete scan');
        }

        setScans((prevScans) =>
          prevScans.filter((item) => item.name !== scan.name)
        );
      } catch (error) {
        console.error('Error deleting scan:', error); // Log any errors to the console
        alert('Failed to delete scan. Please try again.'); // Show an alert to the user if deletion fails
      } finally {
        setLoading(null); // Reset loading state on the UI
      }
    }
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
            <th className="font-medium text-lg text-center pl-5 pt-6 pb-4">
              Uploaded Brain Scans
            </th>
          </tr>
        </thead>
        <tbody>
          {scans.map((scan, index) => (
            <tr key={index}>
              <td className="p-0">
                <div className={`${s.scanItem} flex items-start`}>
                  <button
                    className={`${s.scanButton} ${s.smallerButton} text-left w-full`}
                    onClick={() => handlePopupToggle(scan)}
                    title="Click on this scan to see results"
                  >
                    {scan.name}
                    <br />
                    <span className={s.dateAdded}>
                      {formatDate(scan.dateAdded)}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(scan)}
                    className={s.deleteButton}
                    aria-label={`Delete ${scan.name}`}
                    disabled={loading === scan.name}
                    title="Click on this button to delete the scan"
                  >
                    {loading === scan.name ? (
                      <FaSpinner className={s.spinner} />
                    ) : (
                      <TiDeleteOutline />
                    )}
                  </button>
                </div>
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
