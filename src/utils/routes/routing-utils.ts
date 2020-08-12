import * as H from 'history';

let _location: H.Location;
let _history: H.History<H.LocationState>;

export const initRoutingUtils = (
  location: H.Location,
  history: H.History<H.LocationState>
) => {
  _location = location;
  _history = history;
};

export const getLocation = <S = {}>(): H.Location<S> =>
  _location as H.Location<S>;

export const getHistory = <S = H.LocationState>(): H.History<S> =>
  _history as H.History<S>;
