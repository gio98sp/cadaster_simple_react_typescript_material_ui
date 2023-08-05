import { ThemeProvider } from '@emotion/react';
import React, { createContext, useCallback, useContext, useState } from 'react';

import { Box } from '@mui/material';
import { DarkTheme, LightTheme } from '../themes';

interface IThemeContextData {
  themeName: typeof LightTheme | typeof DarkTheme;
  toggleTheme: () => void;
}

interface IThemeProviderData {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IThemeProviderData> = ({ children }) => {
  const [themeName, setThemeName] = useState(LightTheme);

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === LightTheme ? DarkTheme : LightTheme
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <Box width="100vw" height="100vh" bgcolor={themeName.palette.background.default}>
        <ThemeProvider theme={themeName}>{children}</ThemeProvider>
      </Box>
    </ThemeContext.Provider>
  );
};
