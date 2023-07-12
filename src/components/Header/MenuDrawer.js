import { styled } from "styled-components";
import { Drawer } from '@mui/material';
import { useMenuDrawerContext } from "../../contexts/MenuDrawerContext";
import { useUserProjectsContext } from "../../contexts/UserProjectsContext";

import { MdSpaceDashboard, MdCheckCircle, MdInbox } from "react-icons/md";
import MenuLink from "./MenuLink";
import ProjectIcon from "../ProjectIcon";

const MenuDrawer = () => {
  // states
  const { isMenuDrawerOpen } = useMenuDrawerContext();
  const { projects, sharedProjects } = useUserProjectsContext();

  // utils
  const renderProjects = (projectList) => {
    return projectList.map(project => {
      const { _id, projectName, projectColor } = project;
      return (
        <MenuLink
          key={`ML${_id}`}
          path={`/project/${_id}`}
          text={projectName}
          children={<ProjectIcon color={projectColor} />}
        />
      )
    })
  };

  // rendering
  return (
    <StyledDrawer
      anchor="left"
      open={isMenuDrawerOpen}
      elevation={5}
      variant="persistent"
      transitionDuration={500}
    >
      <Menu>
        <MenuLink
          path="/dashboard"
          text="Dashboard"
          children={<MdSpaceDashboard className="menu-icon" />}
        />
        <MenuLink
          path="/404"
          text="My tasks"
          children={<MdCheckCircle className="menu-icon" />}
        />
        <MenuLink
          path="/404"
          text="Inbox"
          children={<MdInbox className="menu-icon" />}
        />
        <SubMenu title="Projects">
          {renderProjects(projects)}
        </SubMenu>
        <SubMenu title="Share with me">
          {renderProjects(sharedProjects)}
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