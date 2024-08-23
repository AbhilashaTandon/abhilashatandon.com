"use client";

import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
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
