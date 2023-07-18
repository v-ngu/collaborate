// import basics
import { useState } from "react";
import { styled } from "styled-components";

// import contexts
import { useProfileContext } from "../../contexts/ProfileContext";
import { useMenuDrawerContext } from "../../contexts/MenuDrawerContext";

// import components
import Toolbar from "../Toolbar";
import AccountMenu from "./AccountMenu";
import MenuDrawer from "./MenuDrawer";
import ProfileAvatar from "../ProfileAvatar";
import { FiMenu } from "react-icons/fi"

// Header component
const Header = () => {
  // stages
  const [anchorEl, setAnchorEl] = useState(null);
  const { setIsMenuDrawerOpen } = useMenuDrawerContext();

  const {
    profile: { firstName, lastName },
    isLoadingProfile
  } = useProfileContext();

  // utils
  const handleMenuClick = () => {
    setIsMenuDrawerOpen(prevState => !prevState)
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // rendering
  if (isLoadingProfile) return;

  return (
    <HeaderToolbar>
      <MenuIcon onClick={handleMenuClick}/>
      <MenuDrawer />
      <ProfileAvatar handleAvatarClick={handleAvatarClick} firstName={firstName} lastName={lastName} />
      <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </HeaderToolbar>
  );
};

export default Header;

const HeaderToolbar = styled(Toolbar)`
  background-color: var(--gray-blue);
  padding: 0px var(--standard-padding);
  border-bottom: 1px solid var(--light-gray-blue);
`;

const MenuIcon = styled(FiMenu)`
  font-size: 1.3em;
  color: white;
  padding: var(--tiny-padding);

  &:hover{
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    cursor: pointer;
  }
`;