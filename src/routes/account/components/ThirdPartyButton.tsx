import Button, { ButtonProps } from '@material-ui/core/Button';
import * as React from 'react';
import { FunctionComponent, ReactNode, SFC } from 'react';
import styled from 'styled-components/macro';

const IconWrapper = styled.div`
  flex: 0 1 auto;
  display: inline-flex;
`;

const TextWrapper = styled.div`
  flex: 1 0 auto;
`;

const ThirdPartyButtonStyled = styled(Button as SFC<ButtonProps>)`
  &.thirdparty-button {
    width: 100%;
  }
`;

interface Props extends ButtonProps {
  className?: string;
  icon: ReactNode;
  text: string;
}

const ThirdPartyButton: FunctionComponent<Props> = ({
  className,
  icon,
  text,
  ...rest
}) => (
  <ThirdPartyButtonStyled
    className={`${className} thirdparty-button`}
    color="default"
    variant="contained"
    {...rest}
  >
    <IconWrapper>{icon}</IconWrapper>
    <TextWrapper>{text}</TextWrapper>
  </ThirdPartyButtonStyled>
);

export default ThirdPartyButton;
