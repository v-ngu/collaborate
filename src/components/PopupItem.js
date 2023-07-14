import { styled } from "styled-components"

const PopupItem = ({ children }) => {
  return (
    <Action>{children}</Action>
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