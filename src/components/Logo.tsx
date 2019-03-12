import * as React from 'react';
import { FunctionComponent } from 'react';
import styled from 'themes/styled';

const StyledLogo = styled.h1`
  color: ${({
    theme: {
      palette: { getContrastText, primary },
    },
  }) => getContrastText(primary.main)};
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.00833em;
  font-family: 'Leckerli One', cursive;
`;

const Logo: FunctionComponent<{}> = props => (
  <StyledLogo {...props}>Städspelet</StyledLogo>
);

export default Logo;
