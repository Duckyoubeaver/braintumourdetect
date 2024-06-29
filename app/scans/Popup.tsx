import s from './Scans.module.css';
import React from 'react';

interface PopupProps {
  onClose: () => void;
  name: string;
  dateAdded: string;
  url: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, name, dateAdded, url }) => {
  console.log('Popup URL:', url); // Add console log here

  return (
    <div className={s.popupOverlay} onClick={onClose}>
      <div className={s.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          Close
        </button>
        <h2>{name}</h2>
        <p>Date Added: {dateAdded}</p>
        <img
          src={url}
          alt={name}
          className={s.popupImage}
          onError={(e) => console.error('Image failed to load:', e, url)}
        />
      </div>
    </div>
  );
};

export default Popup;
