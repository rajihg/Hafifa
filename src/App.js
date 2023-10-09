import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import MainPage from './views/MainPage';

const theme = createTheme({
  appMain: {
    width: '100%',
  },
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
    undone: {
      main: "#a7a8a7",
      light: "333996"
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})

const App = () =>

  <ThemeProvider theme={theme}>
      <MainPage />
  </ThemeProvider>

export default App;
