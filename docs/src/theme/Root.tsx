import React, { useEffect, useState } from 'react';
import {
  CustomContentContext,
  defaultDocContent,
  defaultTocContent,
  getNewDocContent,
} from '../custom-content';

export default function Root({ children }) {
  const [docContent, setDocContent] = useState(defaultDocContent);
  const [tocContent] = useState(defaultTocContent);

  const updateContent = (forceUpdate = false) => {
    if (docContent === defaultDocContent && !forceUpdate) return;
    setDocContent(getNewDocContent());
  };

  useEffect(() => {
    document.querySelector('#ea-placeholder')?.remove();
    updateContent(true);
  }, []);

  return (
    <CustomContentContext.Provider value={{ docContent, tocContent, updateContent }}>
      {children}
    </CustomContentContext.Provider>
  );
}
