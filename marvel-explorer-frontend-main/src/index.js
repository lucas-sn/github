import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css'

import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core'


let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e23636",
    },
    secondary: {
      main: "#504a4a"
    },
  }
})

theme = responsiveFontSizes(theme);
const target = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  target
);

