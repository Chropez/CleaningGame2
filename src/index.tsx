import CssBaseline from '@material-ui/core/CssBaseline';
import { initializeFirebase } from 'config/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import Routes from 'routes';
import Application from 'routes/application';
import GlobalTheme from 'themes/global-theme';
import mainTheme from 'themes/main-theme';
import { ThemeProvider } from 'themes/styled';
import 'typeface-leckerli-one'; // Used logo
import 'typeface-roboto'; // Used by Material Design
import configureStore from './config/redux';
import * as serviceWorker from './serviceWorker';

initializeFirebase();

const { Provider } = StoreContext;
const store = configureStore();

const render = (RoutesComponent: FunctionComponent) => {
  return ReactDOM.render(
    <Provider value={store}>
      <CssBaseline />
      <GlobalTheme />
      <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
          <Application>
            <RoutesComponent />
          </Application>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
};

render(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextRoutesComponent = require('./routes').default;
    render(NextRoutesComponent);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
