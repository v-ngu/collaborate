import { styled } from "styled-components";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";
import { Drawer } from "@mui/material";
import TaskDrawerInput from "./TaskDrawerInput";
import TaskDrawerAssigneeSelection from "./TaskDrawerAssigneeSelection";
const TaskDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useTaskDrawercontext();

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
      <TaskDrawerInput type="text" field="task" />
      <Container>
        <Field>
          <FieldName>Assginee</FieldName>
          <TaskDrawerAssigneeSelection />
        </Field>

        <FieldName>Due Date</FieldName>
        <FieldName>Labels</FieldName>
        <FieldName>Description</FieldName>
        <TaskDrawerInput
          type="textarea"
          field="description"
          placeholder="What is this task about?"
        />
      </Container>
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
    }

    & .MuiDrawer-paper {
      width: 500px;
      height: calc(100vh - var(--header-height));
      padding: var(--standard-space);
      position: absolute;
      top: var(--header-height);
    }
  }
`;
const Container = styled.div`
  font-size: 0.9rem;
`;
const Field = styled.div`
  display: flex;
  align-items: center;
`;
const FieldName = styled.p`
  color: var(--medium-gray);
  margin: var(--tiny-space);
  margin-left: var(--small-space);
  padding: var(--tiny-space);
  padding-right: var(--large-space);
  font-size: 0.8rem;
`;
