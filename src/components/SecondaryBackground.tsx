import styled from 'styled-components/macro';

const SecondaryBackground = styled.div`
  background-image: ${props => props.theme.secondaryBackground.bgImage};
  display: flex;
  flex: 1 1 auto;
`;

export default SecondaryBackground;
