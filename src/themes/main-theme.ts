import { createMuiTheme, Theme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 14,
    htmlFontSize: 16,
  },
  palette: {
    primary: {
      main: '#1e88e5',
      light: '#62a3ff',
      dark: '#004a9f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#fff',
    },
  },
});

export interface MainTheme extends Theme {
  secondaryBackground: {
    bgImage: string;
    linkColor: string;
    textColor: string;
  };
}

const mainTheme: MainTheme = {
  ...muiTheme,
  secondaryBackground: {
    bgImage: ` linear-gradient(
      to right bottom,
      #62a3ff,
      #579af6,
      #4b91ed,
      #3e89e5,
      #3080dc,
      #2779d4,
      #1e71cc,
      #116ac4,
      #0d62bb,
      #085ab1,
      #0452a8,
      #004a9f
    );`,
    linkColor: '#90ff7e',
    textColor: '#fff',
  },
};

export default mainTheme;
