'use client'; // Ensure this is at the top

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './Documentation.module.css';

interface Section {
  id: string;
  title: string;
}

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  setActiveSection
}) => {
  const pathname = usePathname();

  useEffect(() => {
    const currentRoute = pathname.split('/').pop();
    if (currentRoute) {
      setActiveSection(currentRoute);
    }
  }, [pathname, setActiveSection]);

  return (
    <div className={s.sidebar}>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`/documentation/${section.id}`}
                className={`${s.sidebarLink} ${
                  activeSection === section.id ? s.activeSection : ''
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
