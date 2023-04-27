import React, { createContext, useEffect, useState } from 'react';

const defaultContent = 'Default content';

const getNewContent = () => {
  const rnd = Math.floor(Math.random() * 100);
  return 'New content ' + rnd;
};

export const CustomContentContext = createContext({
  content: defaultContent,
  updateContent: (): void => undefined,
});

export default function Root({ children }) {
  const [content, setContent] = useState(defaultContent);

  const updateContent = (forceUpdate = false) => {
    if (content === defaultContent && !forceUpdate) return content;
    setContent(getNewContent());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateContent(true);
      return () => {
        clearTimeout(timer);
      };
    }, 3000);
  }, []);

  return (
    <CustomContentContext.Provider value={{ content, updateContent }}>
      {children}
    </CustomContentContext.Provider>
  );
}
