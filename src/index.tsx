import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto'; // Used by Material Design
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './mui-theme';
import { MuiThemeProvider } from '@material-ui/core';
import Routes from 'routes';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import { StoreContext } from 'redux-react-hook';
import Application from 'routes/application';

const { Provider } = StoreContext;
const store = configureStore();

const render = (RoutesComponent: FunctionComponent) => {
  return ReactDOM.render(
    <Provider value={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Application>
            <RoutesComponent />
          </Application>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
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
serviceWorker.unregister();
