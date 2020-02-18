import styled from 'styled-components/macro';

const TaskCardsContainer = styled.div`
  display: grid;
  column-gap: ${({ theme }) => theme.spacing(2)}px;
  row-gap: ${({ theme }) => theme.spacing(2)}px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export default TaskCardsContainer;
