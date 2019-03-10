import * as styledComponents from 'styled-components';
import { MainTheme } from './main-theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  MainTheme
>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
