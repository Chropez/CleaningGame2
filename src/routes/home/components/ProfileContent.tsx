import Typography, { TypographyProps } from '@material-ui/core/Typography';
import * as React from 'react';
import { FunctionComponent, SFC } from 'react';
import styled from 'themes/styled';

const AvatarWrapper = styled.div`
  min-height: 100px;
  position: relative;
  margin-bottom: 30px;
`;

const AvatarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const AvatarName = styled(Typography as SFC<TypographyProps>)`
  flex: 0;
`;

const AvatarImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.palette.background.default};
  position: absolute;
  top: -40px;
  z-index: 1100;
`;

const Spacer = styled.div`
  flex: 1;
`;

interface Props {
  name: string;
  avatarUrl: string;
}

const ProfileContent: FunctionComponent<Props> = ({ name, avatarUrl }) => {
  return (
    <AvatarWrapper className="avatarwrapper">
      <AvatarContent>
        <AvatarImage src={avatarUrl} />
        <Spacer />
        <AvatarName variant="body1">{name}</AvatarName>
      </AvatarContent>
    </AvatarWrapper>
  );
};

export default ProfileContent;
