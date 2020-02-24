import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { baseMuiLightTheme, extendedLightTheme } from './main-light-theme';
import { DeepPartial } from 'typings/global';

export interface MainTheme extends Theme {
  secondaryBackground: {
    bgImage: string;
    linkColor: string;
    textColor: string;
    secondaryTextColor: string;
  };
}

export const createTheme = (theme: DeepPartial<MainTheme>) => {
  return createMuiTheme(
    baseMuiLightTheme,
    extendedLightTheme,
    theme
  ) as MainTheme;
};
