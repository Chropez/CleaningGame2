import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import Routes from 'routes';
import Application from 'routes/application';
import GlobalTheme from 'themes/global-theme';
import mainTheme from 'themes/main-theme';
import 'typeface-roboto'; // Used by Material Design
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

const { Provider } = StoreContext;
const store = configureStore();

const render = (RoutesComponent: FunctionComponent) => {
  return ReactDOM.render(
    <Provider value={store}>
      <CssBaseline />
      <GlobalTheme />
      <MuiThemeProvider theme={mainTheme}>
        <BrowserRouter>
          <Application>
            <RoutesComponent />
          </Application>
        </BrowserRouter>
      </MuiThemeProvider>
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
