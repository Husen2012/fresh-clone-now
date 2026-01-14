import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'default' | 'excel' | 'steel';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as ThemeName) || 'default';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    
    // Remove all theme classes
    document.documentElement.classList.remove('theme-default', 'theme-excel', 'theme-steel');
    
    // Add current theme class
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
