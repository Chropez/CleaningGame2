import styled from 'styled-components/macro';
import ListSubheader, {
  ListSubheaderProps
} from '@material-ui/core/ListSubheader';
import { FC } from 'react';

const StickyListSubHeader = styled(ListSubheader as FC<ListSubheaderProps>)`
  && {
    top: var(--toolbar-min-height, 56px);
    background: ${({ theme }) => theme.palette.background.default};
  }
`;

export default StickyListSubHeader;
