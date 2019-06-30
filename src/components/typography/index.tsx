import React, { FC } from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import styled from 'themes/styled';

const H1Component: FC<TypographyProps> = props => (
  <Typography {...props} variant="h6" component={props.component || 'h1'} />
);

export const H1 = styled(H1Component)`
  color: ${props => props.theme.palette.grey[500]};
`;
