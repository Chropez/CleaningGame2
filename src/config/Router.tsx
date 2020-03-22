import React, { FC, useEffect } from 'react';
import { BrowserRouter, useLocation, useHistory } from 'react-router-dom';
import { initRoutingUtils } from 'utils/routes/routing-utils';

interface Props {
  children: JSX.Element;
}

const InitStaticRoutingUtils = () => {
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    initRoutingUtils(location, history);
  }, [history, location]);

  return null;
};

const Router: FC<Props> = ({ children }) => (
  <BrowserRouter>
    <InitStaticRoutingUtils />
    {children}
  </BrowserRouter>
);
export default Router;
