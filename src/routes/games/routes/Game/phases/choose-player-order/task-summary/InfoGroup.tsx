import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';

const Wrapper = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(1)}px;
  display: flex;
  flex-direction: column;
`;

const SecondaryTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const InfoGroupPrimaryText = styled(Typography as FC<TypographyProps>)`
  && {
    color: ${({ theme }) => theme.palette.primary.light};
    font-size: 1.3rem;
    text-align: center;

    ${({ theme }) => theme.breakpoints.up('xs')} {
      font-size: 1.7rem;
    }
  }
`;
const InfoGroupSecondaryText = styled(Typography as FC<TypographyProps>)`
  && {
    color: ${({ theme }) => theme.palette.text.hint};
    line-height: 1.2;
    text-align: center;
    font-size: 0.7rem;
    width: 100%;

    ${({ theme }) => theme.breakpoints.up('xs')} {
      font-size: 0.8rem;
    }
  }
`;

interface InfoGroupProps {
  primaryText: string;
  secondaryText: string;
}

const InfoGroup: FC<InfoGroupProps> = ({ primaryText, secondaryText }) => (
  <Wrapper>
    <InfoGroupPrimaryText>{primaryText}</InfoGroupPrimaryText>
    <SecondaryTextWrapper>
      <InfoGroupSecondaryText>{secondaryText}</InfoGroupSecondaryText>
    </SecondaryTextWrapper>
  </Wrapper>
);

export default InfoGroup;
