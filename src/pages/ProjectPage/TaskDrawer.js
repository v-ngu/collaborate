import { styled } from "styled-components";
import { useTaskDrawercontext } from '../../contexts/TaskDrawerContext';
import { Drawer } from '@mui/material';
import TaskDrawerInput
 from "./TaskDrawerInput";
const TaskDrawer = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen
  } = useTaskDrawercontext();

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <StyledDrawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleClose}
      elevation={5}
    >
      <TaskDrawerInput
        type="text"
        field="task"
      />
      <p>Assignee</p>
      <p>Due Date:</p>
      <p>Labels:</p>
      <p>Description:</p>
    </StyledDrawer>
  );
};

export default TaskDrawer;

const StyledDrawer = styled(Drawer)`
  && {
    & .MuiBackdrop-root {
      background-color: rgba(255, 255, 255, 0.4);
      height: calc(100vh - 57px);
      position: absolute;
      top: 57px;
    };

    & .MuiDrawer-paper {
      width: 500px;
      height: calc(100vh - 57px);
      padding: var(--standard-padding);
      position: absolute;
      top: 57px;
    };
  };
`;