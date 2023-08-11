import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

const MenuLink = ({ children, path, text }) => {
  return (
    <li>
      <Link to={path}>
        {children}
        <Text>{text}</Text>
      </Link>
    </li>
  );
};

export default MenuLink;

const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 94%;
  text-decoration: none;
  color: white;
  padding: var(--tiny-space);

  & .menu-icon {
    font-size: 1.2em;
  }

  &:hover {
    background-color: var(--hover-color);
    border-radius: var(--border-radius);
  }

  &.active {
    background-color: var(--hover-color);
    border-radius: var(--border-radius);
  }
`;
const Text = styled.span`
  padding-left: var(--small-space);
`;