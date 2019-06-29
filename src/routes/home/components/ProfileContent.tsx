import Typography, { TypographyProps } from '@material-ui/core/Typography';
import * as React from 'react';
import { FunctionComponent, SFC } from 'react';
import styled from 'themes/styled';
import { Box, Avatar as MuiAvatar } from '@material-ui/core';
import { AvatarProps } from '@material-ui/core/Avatar';

const AvatarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const AvatarName = styled(Typography as SFC<TypographyProps>)`
  && {
    flex: 0;
    color: ${props => props.theme.palette.blue[100]};
    font-weight: ${props => props.theme.typography.fontWeightBold};
  }
`;

const Avatar = styled(MuiAvatar as SFC<AvatarProps>)`
  && {
    height: 80px;
    width: 80px;
    border: 2px solid ${props => props.theme.palette.background.default};
  }
`;

interface Props {
  name: string;
  avatarUrl: string;
}

const ProfileContent: FunctionComponent<Props> = ({ name, avatarUrl }) => {
  return (
    <Box p={3}>
      <AvatarContent>
        <Box pb={2}>
          <Avatar alt={name} src={avatarUrl} />
        </Box>
        <AvatarName variant="body1">{name}</AvatarName>
      </AvatarContent>
    </Box>
  );
};

export default ProfileContent;
