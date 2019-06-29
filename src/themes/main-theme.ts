import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { Palette } from '@material-ui/core/styles/createPalette';
import { Color } from '@material-ui/core';

const muiTheme = createMuiTheme({
  typography: {
    fontSize: 14,
    htmlFontSize: 16
  },
  palette: {
    primary: {
      main: '#1e88e5',
      light: '#62a3ff',
      dark: '#004a9f',
      contrastText: '#e9f3fc'
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#fff'
    },
    text: {
      primary: '#555',
      secondary: '#555'
    }
  }
});

interface ExtendedPalette extends Palette {
  blue: Color;
}

export interface MainTheme extends Theme {
  secondaryBackground: {
    bgImage: string;
    linkColor: string;
    textColor: string;
  };
  palette: ExtendedPalette;
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
    textColor: '#fff'
  },
  palette: {
    ...muiTheme.palette,
    blue: {
      50: '#e6edf5',
      100: '#b3c9e2',
      200: '#80a5cf	',
      300: '#4d80bc',
      400: '#1a5ca9',
      500: '#004a9f',
      600: '#003b7f',
      700: '#002c5f',
      800: '#001e40',
      900: '#000f20',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161'
    }
  }
};

export default mainTheme;
