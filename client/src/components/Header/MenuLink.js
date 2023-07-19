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
  padding: var(--tiny-padding);

  & .menu-icon {
    font-size: 1.2em;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
`;
const Text = styled.span`
  padding-left: var(--small-padding);
`;