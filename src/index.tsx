import CssBaseline from '@material-ui/core/CssBaseline';
import Application from 'routes/application';
import 'firebase/auth';
import 'firebase/firestore';
import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Routes from 'routes/Routes';
import GlobalStyle from 'config/GlobalStyle';
import 'typeface-leckerli-one'; // Used logo
import 'typeface-roboto'; // Used by Material Design
import * as serviceWorker from './serviceWorker';
import ReduxFirebaseProvider from 'config/ReduxFirebaseProvider';
import AppThemeProvider from 'config/AppThemeProvider';
import Router from 'config/Router';

const render = (RoutesComponent: FunctionComponent) => {
  return ReactDOM.render(
    <ReduxFirebaseProvider>
      <GlobalStyle />
      <AppThemeProvider>
        <CssBaseline />
        <Router>
          <Application>
            <RoutesComponent />
          </Application>
        </Router>
      </AppThemeProvider>
    </ReduxFirebaseProvider>,
    document.getElementById('root')
  );
};

render(Routes);

if (module.hot) {
  module.hot.accept('./routes/Routes', () => {
    let NextRoutesComponent = require('./routes/Routes').default;
    render(NextRoutesComponent);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: registration => {
    alert('Ny version tillgänglig! Redo att uppdatera?');
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  },
});
