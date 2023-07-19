import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SucessSnackbar = ({ snackbarIsOpen, setSnackbarIsOpen }) => {
  const handleClose = () => {
    setSnackbarIsOpen(false);
  };

  // render
  return (
    <Snackbar 
      open={snackbarIsOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Project successfully deleted
      </Alert>
    </Snackbar>
  );
};

export default SucessSnackbar;