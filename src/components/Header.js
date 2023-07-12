import { useState } from "react";
import { styled } from "styled-components";
import { useProfileContext } from "../contexts/ProfileContext";
import setAvatar from "../utils/set-avatar";
import Toolbar from "./Toolbar";
import LogoutButton from "./buttons/LogoutButton";
import { Avatar, Menu } from "@mui/material";
import { FiMenu } from "react-icons/fi"

const Header = () => {
  // stages
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    profile: { firstName, lastName, email },
    isLoadingProfile
  } = useProfileContext();

  // utils
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  // rendering
  if (isLoadingProfile) return;

  return (
    <HeaderToolbar>
      <MenuIcon />
      <ProfileAvatar
        onClick={handleAvatarClick}
        {...setAvatar(firstName, lastName)}
      />
      <AccountMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAvatarClose}
      >
        <AccountInfo>
          <ProfileAvatar $large={true} {...setAvatar(firstName, lastName)} />
          <div>
            <Name>{firstName} {lastName}</Name>
            <Email>{email}</Email>
          </div>
        </AccountInfo>
        <Action>Account settings</Action>
        <Action>Get help</Action>
        <Action>Privacy policy</Action>
        <Action>
          <LogoutButton>Sign out</LogoutButton>
        </Action>
      </AccountMenu>
    </HeaderToolbar>
  );
};

export default Header;

const HeaderToolbar = styled(Toolbar)`
  background-color: var(--gray-blue);
  padding: 0px var(--standard-padding);
  border-bottom: var(--light-gray);
`;

const MenuIcon = styled(FiMenu)`
  font-size: 1.3em;
  color: white;
  padding: 5px;

  &:hover{
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
`;

const ProfileAvatar = styled(Avatar)`
  && {
    width: ${({ $large }) => $large ? "70px" : null};
    height: ${({ $large }) => $large ? "70px" : null};
    font-size: ${({ $large }) => $large ? "35px" : null};

    &:hover {
      cursor: ${({ $large }) => $large ? null : "pointer"};
    }
  }
`;

const AccountMenu = styled(Menu)`
&& {
  margin-top: var(--small-margin);

  & .MuiMenu-list{
    padding: 0px;
  }

  & .MuiMenu-paper {
    border: 1px solid var(--light-gray);
    box-shadow: none;
    min-width: 300px;
  }
}
`;

const AccountInfo = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid var(--light-gray);
  padding: var(--standard-padding);
`;

const Name = styled.p`
  font-weight: bold;
`;

const Email = styled.p`
  font-size: 0.8em;
  color: gray;
`;

const Action = styled.li`
  padding: var(--standard-padding);

  &:hover {
    background-color: rgba(219, 218, 219, 0.4);
    cursor: pointer;
  }
`;