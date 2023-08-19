import dayjs from "dayjs";
import { styled } from "styled-components";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";

const CalendarButton = ({ calendarIsOpen, setCalendarIsOpen }) => {
  // Accessing Task Drawer Context
  const { drawerContent } = useTaskDrawercontext();
  const dueDate = drawerContent.taskObject.dueDate;

  return (
    <Button
      onClick={() => setCalendarIsOpen(true)}
      disabled={calendarIsOpen && true}
    >
      {dueDate ? dayjs(dueDate).format("MMM D, YYYY") : "No due date"}
    </Button>
  );
};

export default CalendarButton;

const Button = styled.button`
  margin-left: var(--small-space);
  padding: var(--tiny-space);
  padding-left: 10px;
  border-radius: var(--large-radius);
  border: 1px solid transparent;
  background-color: transparent;
  text-align: left;
  font-size: 0.8rem;
  width: 175px;
  cursor: pointer;

  &:hover {
    border: var(--standard-border);
  }
`;
