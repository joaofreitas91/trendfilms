import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [filter, setFilter] = useState(null);
  return (
    <GlobalContext.Provider value={{ filter, setFilter }}>
      {children}
    </GlobalContext.Provider>
  );
};
