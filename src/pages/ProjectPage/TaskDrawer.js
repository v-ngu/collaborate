import { styled } from "styled-components";
import { useDrawercontext } from '../../contexts/DrawerContext';
import { Drawer } from '@mui/material';

const TaskDrawer = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerContent,
    setDrawerContent
  } = useDrawercontext();

  const handleClose = () => {
    setIsDrawerOpen(false);
    setDrawerContent([]);
  };

  return (
    <StyledDrawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleClose}
      elevation={3}
    >
      <p>{drawerContent}</p>
    </StyledDrawer>
  );
};

export default TaskDrawer;

const StyledDrawer = styled(Drawer)`
  && {
    & .MuiBackdrop-root {
      margin-top: 50px;
      background-color: rgba(255, 255, 255, 0.3);
    };

    & .MuiDrawer-paper {
      width: 500px;
      padding: 20px;
      margin-top: 50px;
    };
  };
`;