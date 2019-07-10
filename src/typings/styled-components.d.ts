import { MainTheme } from '../themes/main-theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends MainTheme {}
}
