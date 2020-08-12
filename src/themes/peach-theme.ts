import { DeepPartial } from 'typings/global';
import { MainTheme } from '.';
import { deepOrange, grey, brown } from '@material-ui/core/colors';

const peachTheme: DeepPartial<MainTheme> = {
  palette: {
    primary: {
      main: deepOrange[100], // #ffccbc
      light: '#ffffb0',
      dark: '#c97b63',
      contrastText: '#543624',
    },
    secondary: {
      main: '#6d4c41',
      light: '#9c786c',
      dark: '#40241a',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#31180f',
      secondary: '#906656',
      hint: brown[200],
      disabled: grey[300],
    },
    action: {
      disabled: grey[400],
      active: '#6d4c41',
    },
    background: {
      default: '#fff8f6',
    },
  },
  secondaryBackground: {
    bgImage: `linear-gradient(
        to right bottom,
        #e5b4a4, 
        #ecc3b5, 
        #f2d1c6, 
        #f9e0d7, 
        #ffefe9
    );`,
    linkColor: '#90ff7e',
    // textColor: '#31180f',
    textColor: '#543624',
    secondaryTextColor: '#906656',
  },
};

export default peachTheme;
