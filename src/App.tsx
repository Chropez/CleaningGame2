import React, { Component } from 'react';
import 'typeface-roboto'; // Used by Material Design
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './mui-theme';
import { MuiThemeProvider } from '@material-ui/core';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import store from './store';

const { Provider } = StoreContext;

class App extends Component {
  render() {
    return (
      <Provider value={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
          {/* <h1>Login page</h1>
          <Button color="primary" variant="contained">
            Login
          </Button> */}
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
