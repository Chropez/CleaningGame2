import MuiLink, { LinkProps } from '@material-ui/core/Link';
import * as React from 'react';
import { FunctionComponent, memo } from 'react';

const Link: FunctionComponent<LinkProps> = ({ href, ...rest }) => (
  <MuiLink
    // component={RouterLink as any}
    {...{ to: href }}
    color="primary"
    {...rest}
  />
);

export default memo(Link);
