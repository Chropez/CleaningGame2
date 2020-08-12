import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import React, { forwardRef } from 'react';
import { FunctionComponent, memo } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdapterLink = forwardRef<HTMLAnchorElement, any>((props, ref) => (
  <RouterLink {...(props as RouterLinkProps)} to={props.href} innerRef={ref} />
));

AdapterLink.displayName = 'AdapterLink';

const Link: FunctionComponent<MuiLinkProps> = props => (
  <MuiLink component={AdapterLink} {...props} />
);

export default memo(Link);
