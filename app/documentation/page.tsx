// app/documentation/page.tsx
import React from 'react';
import s from './Documentation.module.css'; // Import the CSS module

const DocumentationPage: React.FC = () => {
  return (
    <div className={s.contentSection}>
      <h1>Documentation</h1>
      <p>Welcome to the documentation. Select a section from the sidebar.</p>
    </div>
  );
};

export default DocumentationPage;
