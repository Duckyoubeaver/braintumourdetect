// Popup.tsx

import s from './Scans.module.css';
import React from 'react';

interface PopupProps {
  onClose: () => void;
  name: string;
  dateAdded: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, name, dateAdded }) => {
  return (
    <div className={s.popupOverlay} onClick={onClose}>
      <div className={s.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          Close
        </button>
        <h2>{name}</h2>
        {/* <p>Date Added: {dateAdded}</p> */}
      </div>
    </div>
  );
};

export default Popup;
