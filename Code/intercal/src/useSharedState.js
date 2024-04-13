import { useState, useContext, createContext } from 'react';

const sharedStateContext = createContext();

export function ProvideSharedState({ children }) {
  const sharedState = useState(null);
  return <sharedStateContext.Provider value={sharedState}>{children}</sharedStateContext.Provider>;
}

export function useSharedState() {
  return useContext(sharedStateContext);
}