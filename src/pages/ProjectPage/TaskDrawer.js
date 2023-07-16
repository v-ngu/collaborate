import { styled } from "styled-components";
import { useTaskDrawercontext } from '../../contexts/TaskDrawerContext';
import { Drawer } from '@mui/material';

const TaskDrawer = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerContent,
    setDrawerContent
  } = useTaskDrawercontext();

  const {
    task,
    assignee,
    dueDate,
    labels,
    description
  } = drawerContent;

  const handleClose = () => {
    setIsDrawerOpen(false);
    setDrawerContent({});
  };

  return (
    <StyledDrawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleClose}
      elevation={5}
    >
      <p>{task}</p>
      <p>Assignee: {assignee}</p>
      <p>Due Date: {dueDate}</p>
      <p>Labels:</p>
      <p>Description: {description}</p>
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