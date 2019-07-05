import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Application from 'components/application';
import { initializeFirebase } from 'config/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/Routes';
import GlobalTheme from 'themes/global-theme';
import mainTheme from 'themes/main-theme';
import { ThemeProvider } from 'themes/styled';
import 'typeface-leckerli-one'; // Used logo
import 'typeface-roboto'; // Used by Material Design
import configureStore from './config/redux';
import * as serviceWorker from './serviceWorker';

initializeFirebase();

const store = configureStore();

const render = (RoutesComponent: FunctionComponent) => {
  return ReactDOM.render(
    <Provider store={store}>
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
    </Provider>,
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
