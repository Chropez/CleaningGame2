import MuiLink, { LinkProps } from '@material-ui/core/Link';
import React from 'react';
import { FunctionComponent, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link: FunctionComponent<LinkProps> = ({ href, ...rest }) => (
  <MuiLink
    component={props => <RouterLink {...props} />}
    {...{ to: href }}
    color="primary"
    {...rest}
  />
);

export default memo(Link);
