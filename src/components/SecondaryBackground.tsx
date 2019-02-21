import styled from 'themes/styled';

const SecondaryBackground = styled.div`
  background-image: ${props => props.theme.secondaryBackground.bgImage};
  display: flex;
  flex: 1 1 auto;
`;

export default SecondaryBackground;
