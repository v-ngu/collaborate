import { styled } from "styled-components";
import { Menu } from "@mui/material"

const PopupMenu = ({ children, anchorEl, handleClose }) => {
  return (
    <CustomMenu 
      anchorEl={anchorEl} 
      open={Boolean(anchorEl)} 
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      transformOrigin={{vertical: "top", horizontal: "right"}}
    >
      {children}
    </CustomMenu>
  );
};

export default PopupMenu;

const CustomMenu = styled(Menu)`
&& {
  margin-top: var(--small-margin);

  & .MuiMenu-list{
    padding: 0px;
  }

  & .MuiMenu-paper {
    border: 1px solid var(--light-gray);
    box-shadow: none;
    min-width: 300px;
  }
}
`;