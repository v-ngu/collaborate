import { styled } from "styled-components"
import { Link } from "react-router-dom";

const PopupItem = ({ className, children, text, handleClick }) => {
  return (
    <Action className={className}>
      <CustomLink onClick={handleClick}>
        {children}
        <span>{text}</span>
      </CustomLink>
    </Action>
  );
};

export default PopupItem;

const Action = styled.li`
  padding: var(--standard-space);

  &:hover {
    background-color: rgba(219, 218, 219, 0.4);
    cursor: pointer;
  }
`;
const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;

  &:hover {
    color: var(--main-gray);
    cursor: pointer;
  }

  & .popup-icon {
    padding-right: var(--small-space);
    font-size: 1.2em;
  }
`;