import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { Drawer } from '@mui/material';
import { useMenuDrawerContext } from "../../contexts/MenuDrawerContext";

import { MdSpaceDashboard, MdCheckCircle, MdInbox } from "react-icons/md";
import ProjectIcon from "../ProjectIcon";

const MenuDrawer = () => {
  const { isMenuDrawerOpen } = useMenuDrawerContext();

  return (
    <StyledDrawer
      anchor="left"
      open={isMenuDrawerOpen}
      elevation={5}
      variant="persistent"
      transitionDuration={500}
    >
      <Menu>
        <Li>
          <MdSpaceDashboard className="menu-icon" />
          <MenuLink to="/dashboard">Dashboard</MenuLink>
        </Li>
        <Li>
          <MdCheckCircle className="menu-icon" />
          <MenuLink>My tasks</MenuLink>
        </Li>
        <Li>
          <MdInbox className="menu-icon" />
          <MenuLink>Inbox</MenuLink>
        </Li>
        <SubMenu title="Projects">
          <Li>
            <ProjectIcon color="red" />
            <MenuLink to="/project/64ac6a62a1cae114db08365f">Project 1</MenuLink>
          </Li>
        </SubMenu>
        <SubMenu title="Share with me">
          <Li>
            <ProjectIcon color="yellow" />
            <MenuLink>Shared 1</MenuLink>
          </Li>
        </SubMenu>
      </Menu>
    </StyledDrawer>
  );
};

export default MenuDrawer;

const StyledDrawer = styled(Drawer)`
  && {
    & .MuiDrawer-paper {
      width: 250px;
      height: calc(100vh - 57px);
      background-color: var(--gray-blue);
      color: white;
      position: absolute;
      top: 57px;
    };
  };
`;

const Menu = styled.ul`
  padding: var(--standard-padding);
`;
const SubMenu = styled.ul`
  &:before {
    content:attr(title);
    display: block;
    font-weight: bold;
    padding: var(--tiny-padding);
    margin-top: var(--small-margin);
  }
`;
const Li = styled.li`
  padding: var(--tiny-padding);
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  & .menu-icon {
    font-size: 1.2em;
  }
`;
const MenuLink = styled(NavLink)`
  padding-left: var(--small-padding);
  text-decoration: none;
  color: white;
`;

const DashboardIcon = styled(MdSpaceDashboard)`

`;