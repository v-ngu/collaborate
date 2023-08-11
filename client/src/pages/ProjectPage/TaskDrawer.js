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
      <FieldName>Description</FieldName>
      <TaskDrawerInput
        type="textarea"
        field="description"
      />
      <p>Assignee</p>
      <p>Due Date:</p>
      <p>Labels:</p>
    </StyledDrawer>
  );
};

export default TaskDrawer;

const StyledDrawer = styled(Drawer)`
  && {
    & .MuiBackdrop-root {
      background-color: rgba(255, 255, 255, 0.4);
      height: calc(100vh - var(--header-height));
      position: absolute;
      top: var(--header-height);
    };

    & .MuiDrawer-paper {
      width: 500px;
      height: calc(100vh - var(--header-height));
      padding: var(--standard-space);
      position: absolute;
      top: var(--header-height);
    };
  };
`;

const FieldName = styled.p`
  color: var(--medium-gray);
  margin-left: var(--small-space);
  padding: var(--tiny-space);
`;