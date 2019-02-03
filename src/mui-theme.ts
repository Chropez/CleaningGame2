import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#1675d1",
      light: "#62a3ff",
      dark: "#004a9f",
      contrastText: "#fff"
    },
    secondary: {
      main: "#f50057",
      light: "#ff5983",
      dark: "#bb002f",
      contrastText: "#fff"
    }
  }
});
