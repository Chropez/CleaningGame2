import styled, { withTheme } from 'styled-components';

const ColoredWrapper = withTheme(
  styled.div`
    background-image: ${props => props.theme.other.bgImage};
    display: flex;
    flex: 1 1 auto;
  `
);

export default ColoredWrapper;
