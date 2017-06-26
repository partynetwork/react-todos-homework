import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  primaryColor: '#1D2441',
  themeColor1: '#30004C',
  themeColor2: '#1D2441',
  themeColor3: '#60BAC3',
  themeColor4: '#6e60f8',
  themeColor5: '#09132C',
  themeColor6: '#3B4E6C',
  whiteSmokeColor: '#E0E1E5',
  successColor: '#00FF6D',
  warningColor: '#FECE00',
  errorColor : '#e21f43',

  // For `styled-component-breakpoint` number is start of screen resolution
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

// Create a GreenSection component that renders its children wrapped in
// a ThemeProvider with a green theme
const DefaultTheme = (props) => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
};

export {
  DefaultTheme
}
