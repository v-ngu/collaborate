import { styled } from "styled-components"
import { Link } from "react-router-dom";

const PopupItem = ({ children, text }) => {
  return (
    <Action>
      <CustomLink>
        {children}
        <span>{text}</span>
      </CustomLink>
    </Action>
  );
};

export default PopupItem;

const Action = styled.li`
  padding: var(--standard-padding);

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
    color: var(--gray-blue);
  }

  & .popup-icon {
    padding-right: var(--small-padding);
    font-size: 1.2em;
  }
`;