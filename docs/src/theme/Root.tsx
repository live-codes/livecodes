// eslint-disable-next-line import/no-unresolved
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import React, { useEffect, useState } from 'react';
import {
  CustomContentContext,
  defaultDocContent,
  defaultTocContent,
  getNewDocContent,
} from '../custom-content';

export default function Root({ children }) {
  const [docContent, setDocContent] = useState(defaultDocContent);
  const [tocContent, setTocContent] = useState(defaultTocContent);

  const updateContent = (forceUpdate = false) => {
    if (docContent === defaultDocContent && !forceUpdate) return;
    setDocContent(getNewDocContent());
  };

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      document.querySelector('#ea-placeholder')?.remove();
    }
    updateContent(true);

    fetchSponsorsData().then((content) => {
      if (content) {
        setTocContent(content);
      }
    });
  }, []);

  return (
    <CustomContentContext.Provider value={{ docContent, tocContent, updateContent }}>
      {children}
    </CustomContentContext.Provider>
  );
}

const fetchSponsorsData = async (): Promise<string | undefined> => {
  const url = 'https://blog.livecodes.io/data/sponsors.json';

  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const json = await res.json();
    return json.content;
  } catch {
    return;
  }
};
