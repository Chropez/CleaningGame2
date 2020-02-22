import { MainTheme } from 'themes';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => void;
    theme: MainTheme;
  }
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};
export {};
