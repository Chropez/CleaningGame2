import Button, { ButtonProps } from '@material-ui/core/Button';
import * as React from 'react';
import { FunctionComponent, memo, ReactNode, SFC } from 'react';
import styled from 'themes/styled';

const IconWrapper = styled.div`
  margin-right: 1rem;
  display: inline-flex;
`;

const ThirdPartyButtonStyled = styled(Button as SFC<ButtonProps>)`
  &.thirdparty-button {
    width: 100%;
  }
`;

interface Props {
  className?: string;
  icon: ReactNode;
  text: string;
}

const ThirdPartyButton: FunctionComponent<Props> = ({
  className,
  icon,
  text,
}) => (
  <ThirdPartyButtonStyled
    className={`${className} thirdparty-button`}
    color="default"
    variant="contained"
  >
    <IconWrapper>{icon}</IconWrapper>
    <div>{text}</div>
  </ThirdPartyButtonStyled>
);

export default memo(ThirdPartyButton);
