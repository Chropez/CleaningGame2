import { FC } from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components/macro';

// const H1Component: FC<TypographyProps> = props => (
//   <Typography {...props} variant="h6" component={props.component || 'h1'} />
// );

// export const H1 = styled(H1Component)``;

export const Small = styled(Typography as FC<TypographyProps>)`
  && {
    font-size: 0.6rem;
  }
`;
