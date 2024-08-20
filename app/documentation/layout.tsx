'use client'; // Ensure this is at the top

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import s from './Documentation.module.css';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'video-tutorial', title: 'Video Tutorial' },
  { id: 'faq', title: 'FAQ' },
  { id: 'contact', title: 'Contact' }
];

const DocumentationLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  return (
    <div className={s.docContainer}>
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className={s.mainContent}>{children}</div>
    </div>
  );
};

export default DocumentationLayout;
