// app/documentation/layout.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import s from './Documentation.module.css';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'features', title: 'Features' },
  { id: 'video-demo', title: 'Video Demo' },
  { id: 'faq', title: 'FAQ' }
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
