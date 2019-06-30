import MuiLink, { LinkProps } from '@material-ui/core/Link';
import React, { forwardRef } from 'react';
import { FunctionComponent, memo } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';

const AdapterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <RouterLink innerRef={ref} {...props} />
);

AdapterLink.displayName = 'AdapterLink';

const Link: FunctionComponent<LinkProps> = ({ href, ...rest }) => (
  <MuiLink
    component={props => <AdapterLink {...props} />}
    {...{ to: href }}
    color="primary"
    {...rest}
  />
);

export default memo(Link);
