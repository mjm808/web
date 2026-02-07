import { createContext, useContext, useState, useEffect } from 'react';

const ModeContext = createContext();

export function ModeProvider({ children }) {
  // Check localStorage for saved preference, default to retro
  const [isRetroMode, setIsRetroMode] = useState(() => {
    const saved = localStorage.getItem('siteMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Persist preference
  useEffect(() => {
    localStorage.setItem('siteMode', JSON.stringify(isRetroMode));
  }, [isRetroMode]);

  const toggleMode = () => setIsRetroMode(prev => !prev);

  return (
    <ModeContext.Provider value={{ isRetroMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export const useMode = () => useContext(ModeContext);