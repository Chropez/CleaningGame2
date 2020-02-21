import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Application from 'routes/application';
import 'firebase/auth';
import 'firebase/firestore';
import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/Routes';
import GlobalTheme from 'themes/global-theme';
import mainTheme from 'themes/main-theme';
import { ThemeProvider } from 'styled-components/macro';
import 'typeface-leckerli-one'; // Used logo
import 'typeface-roboto'; // Used by Material Design
import * as serviceWorker from './serviceWorker';
import ReduxFirebaseProvider from 'config/ReduxFirebaseProvider';

const render = (RoutesComponent: FunctionComponent) => {
  return ReactDOM.render(
    <ReduxFirebaseProvider>
      <CssBaseline />
      <GlobalTheme />
      <MuiThemeProvider theme={mainTheme}>
        <ThemeProvider theme={mainTheme}>
          <BrowserRouter>
            <Application>
              <RoutesComponent />
            </Application>
          </BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </ReduxFirebaseProvider>,
    document.getElementById('root')
  );
};

render(Routes);

if (module.hot) {
  module.hot.accept('./routes/Routes', () => {
    const NextRoutesComponent = require('./routes/Routes').default;
    render(NextRoutesComponent);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
