import React, { FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components/macro';
import { StylesProvider } from '@material-ui/core/styles';
import { createTheme } from 'themes';
import peachTheme from 'themes/peach-theme';
import blueTheme from 'themes/blue-theme';

interface Props {
  children: JSX.Element[];
}

const getTheme = () => {
  const localStorageTheme = localStorage.getItem('theme');

  if (localStorageTheme && localStorageTheme === 'blue') {
    return blueTheme;
  }
  return peachTheme;
};

const theme = createTheme(getTheme());

const AppThemeProvider2: FC<Props> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>{children}</StylesProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default AppThemeProvider2;
