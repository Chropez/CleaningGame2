import * as React from 'react';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { ApplicationState } from 'store/root-reducer';
import * as H from 'history';

type Props = RouteProps;

// const AnonymousOnlyRoute: FunctionComponent<Props> = props => {
//   let isLoggedIn = useSelector(
//     (state: ApplicationState) => !state.firebase.auth.isEmpty
//   );
//   let isLoaded = useSelector(
//     (state: ApplicationState) => state.firebase.auth.isLoaded
//   );

//   if (!isLoaded) {
//     return null;
//   }

//   if (isLoggedIn) {
//     return <Redirect to="/" />;
//   }

//   return <Route {...props} />;
// };

const AnonymousOnlyRoute: FunctionComponent<Props> = ({
  children,
  ...rest
}) => {
  let isLoggedIn = useSelector(
    (state: ApplicationState) => !state.firebase.auth.isEmpty
  );
  let isLoaded = useSelector(
    (state: ApplicationState) => state.firebase.auth.isLoaded
  );

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isLoaded) {
          return null;
        }

        if (isLoggedIn) {
          return (
            <Redirect
              to={
                (location as H.Location<{ from?: Location }>).state?.from
                  ?.pathname || '/'
              }
            />
          );
        }

        return <>{children}</>;
      }}
    />
  );
};
export default AnonymousOnlyRoute;
