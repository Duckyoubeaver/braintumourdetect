'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import s from '../Documentation.module.css'; // Import the CSS module

type SectionKey =
  | 'introduction'
  | 'getting-started'
  | 'features'
  | 'video-demo'
  | 'faq';

const sections: Record<SectionKey, { title: string; content: string }> = {
  introduction: {
    title: 'Introduction',
    content: 'Welcome to the Neurovision documentation'
  },
  'getting-started': {
    title: 'Getting Started',
    content: 'To get started with NeuroVision...'
  },
  features: {
    title: 'Features',
    content: 'NeuroVision offers the following features...'
  },
  'video-demo': {
    title: 'Video Demo',
    content: "Here's the Video demo for NeuroVision."
  },
  faq: {
    title: 'FAQ',
    content: 'Frequently asked questions about NeuroVision...'
  }
};

const SectionPage: React.FC = () => {
  const params = useParams();
  const section = params.section as SectionKey;
  const sectionData = sections[section];

  if (!sectionData) {
    return <p>Section not found</p>;
  }

  return (
    <div className={s.contentSection}>
      {' '}
      {/* Apply the CSS module class */}
      <h1>{sectionData.title}</h1>
      <p>{sectionData.content}</p>
    </div>
  );
};

export default SectionPage;
