import { styled } from "styled-components";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";

const CalendarClearButton = () => {
  // Accessing Task Drawer Context
  const {
    drawerContent: { taskObject },
    handleCalendarChange,
    emitUpdate,
  } = useTaskDrawercontext();

  return (
    <>
      {taskObject.dueDate ? (
        <Button
          onClick={() => {
            handleCalendarChange("");
            emitUpdate("dueDate");
          }}
        >
          x
        </Button>
      ) : null}
    </>
  );
};

export default CalendarClearButton;

const Button = styled.button`
  position: relative;
  top: -1px;
  left: -24px;
  padding: var(--tiny-space);
  border: 1px solid transparent;
  background-color: transparent;
  font-size: 1rem;
  color: var(--medium-gray);
  cursor: pointer;

  &:hover {
    color: var(--main-yellow);
  }
`;
