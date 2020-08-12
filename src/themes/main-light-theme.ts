import { blue, grey } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const SPACING = 8;

export const baseMuiLightTheme: ThemeOptions = {
  typography: {
    fontSize: 14,
    h2: {
      color: grey[600],
      fontSize: '1.8rem',
    },
  },
  spacing: SPACING,
  palette: {
    primary: {
      main: '#1e88e5',
      light: '#62a3ff',
      dark: '#004a9f',
      contrastText: '#e9f3fc',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#fff',
    },
    text: {
      primary: '#555',
      secondary: '#555',
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiTypography: {
      h2: {
        marginBottom: `${SPACING * 2}px`,
        marginTop: `${SPACING * 2}px`,
      },
    },
    MuiChip: {
      label: {
        display: 'flex',
        alignItems: 'flex-end',
      },
    },
  },
};

export const extendedLightTheme = {
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
    secondaryTextColor: blue[100],
  },
};
