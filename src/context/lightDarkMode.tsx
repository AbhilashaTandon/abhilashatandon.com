"use client";

import React, { createContext, useState } from "react";

export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
} as ThemeContextType);

export function ThemeProvider(props: any) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

//taken from https://medium.com/lets-make-something-up/creating-light-dark-mode-on-a-react-app-with-context-589a5465f639
