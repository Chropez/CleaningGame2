import React, { FC, ReactNode } from 'react';
import styled from 'styled-components/macro';

const StyledPageWrapper = styled.div`
  && {
    min-height: calc((var(--vh, 1vh) * 100) - var(--toolbar-min-height, 56px));
    display: flex;
    flex-direction: column;

    @media (min-height: 1000px) {
      min-height: auto;
    }
  }

  > * {
    flex: 1;
  }
`;

interface Props {
  children: ReactNode;
}
const PageWrapper: FC<Props> = props => <StyledPageWrapper {...props} />;

export default PageWrapper;
