import * as React from 'react';
import { FunctionComponent } from 'react';

const Application: FunctionComponent = ({ children }) => (
  <div>
    Main layouta
    <hr />
    {children}
  </div>
);

export default Application;
