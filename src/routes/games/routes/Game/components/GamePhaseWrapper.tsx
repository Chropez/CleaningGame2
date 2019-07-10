import React, { FC } from 'react';
import styled from 'styled-components/macro';

const StyledGamePhaseWrapper = styled.div`
  && {
    min-height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;

    @media (min-width: 600px) {
      min-height: calc(100vh - 64px);
    }

    @media (min-height: 1000px) {
      min-height: auto;
    }
  }

  > * {
    flex: 1;
  }
`;

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const GamePhaseWrapper: FC<Props> = props => (
  <StyledGamePhaseWrapper {...props} />
);

export default GamePhaseWrapper;
