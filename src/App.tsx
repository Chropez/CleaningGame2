import React, { Component } from "react";
import "typeface-roboto"; // Used by Material Design
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./mui-theme";
import { MuiThemeProvider, Button } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <h1>Login page</h1>
          <Button color="primary" variant="contained">
            Login
          </Button>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
