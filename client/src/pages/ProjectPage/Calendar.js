import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = ({ setIsOpen }) => {
  // Accessing Task Drawer Context
  const {
    drawerContent: { taskObject },
    handleCalendarChange,
    emitUpdate,
  } = useTaskDrawercontext();

  // Determine if clicking outside of the calendar
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarRef]);

  return (
    <Container ref={calendarRef}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={(newDate) => {
            handleCalendarChange(newDate);
            emitUpdate("dueDate");
          }}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  position: absolute;
  top: 150px;
  left: 100px;
  background-color: white;
  border: var(--standard-border);
  border-radius: var(--border-radius);
`;
