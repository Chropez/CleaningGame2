import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import { blue, green } from '@material-ui/core/colors';

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
  },
  overrides: {}
});

interface ExtendedPalette extends Palette {
  success: PaletteColor;
}

export interface MainTheme extends Theme {
  secondaryBackground: {
    bgImage: string;
    linkColor: string;
    textColor: string;
    secondaryTextColor: string;
  };
  palette: ExtendedPalette;
  // components: {
  //   BottomButtonBar: {

  //   }
  // }
}

const mainTheme: MainTheme = {
  ...muiTheme,
  secondaryBackground: {
    bgImage: `linear-gradient(
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
    secondaryTextColor: blue[100]
  },
  palette: {
    ...muiTheme.palette,
    success: {
      main: green[600],
      light: green[100],
      dark: green[800],
      contrastText: muiTheme.palette.common.white
    }
  }
};

export default mainTheme;
