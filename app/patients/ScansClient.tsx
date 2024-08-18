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

  const handleDelete = async (scan: Scan) => {
    if (window.confirm(`Are you sure you want to delete ${scan.name}?`)) {
      setLoading(scan.name);
      try {
        // Extract folder path from URL
        const folderPath = pathname
          ? pathname.split('/').pop() || 'default-folder'
          : 'default-folder';

        const response = await fetch(
          `/api/delete-image?folderPath=${encodeURIComponent(
            folderPath
          )}&fileName=${encodeURIComponent(scan.name)}`,
          {
            method: 'DELETE'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete scan');
        }

        setScans((prevScans) =>
          prevScans.filter((item) => item.name !== scan.name)
        );
      } catch (error) {
        console.error('Error deleting scan:', error);
        alert('Failed to delete scan. Please try again.');
      } finally {
        setLoading(null);
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
              <div className={`${s.scanItem} flex items-start`}>
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
                <button
                  onClick={() => handleDelete(scan)}
                  className={s.deleteButton}
                  aria-label={`Delete ${scan.name}`}
                  disabled={loading === scan.name}
                >
                  {loading === scan.name ? (
                    <FaSpinner className={s.spinner} />
                  ) : (
                    <TiDeleteOutline />
                  )}
                </button>
              </div>
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
