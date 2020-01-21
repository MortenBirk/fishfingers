import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});

ReactDOM.render(<ThemeProvider theme={theme}><App /></ThemeProvider>, document.getElementById('app'));