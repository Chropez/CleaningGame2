import * as React from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

const StyledLogo = styled.h1`
  /* color: ${({
    theme: {
      palette: { getContrastText, primary },
    },
  }) => getContrastText(primary.main)}; */
  color: ${({
    theme: {
      palette: { primary },
    },
  }) => primary.contrastText};
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.00833em;
  font-family: 'Leckerli One', cursive;
  margin: 0;
`;

const Logo: FunctionComponent<{}> = props => (
  <StyledLogo {...props}>Städspelet</StyledLogo>
);

export default Logo;
