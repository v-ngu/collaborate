// import basics
import { useState } from "react";
import { styled } from "styled-components";

// import hooks and contexts
import useHeaders from "../../hooks/useHeaders";
import { useUserProjectsContext } from "../../contexts/UserProjectsContext";

// imports for making API call
import makeFetchRequest from "../../utils/make-fetch-request";
import { deleteProject } from "../../services/projects-api";

// import components and icons
import PopupMenu from "../../components/PopupMenu";
import PopupItem from "../../components/PopupItem";
import { BsThreeDots } from "react-icons/bs";
import { BiCopy, BiLink, BiTrash } from "react-icons/bi";

const Options = ({ isHovered, setIsHovered, projectId, setSnackbarIsOpen }) => {
  // states
  const [mouseOn, setMouseOn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [headers] = useHeaders();
  const { setReloadProjects } = useUserProjectsContext();

  // utils
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsClicked(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsClicked(false);
    setIsHovered(false);
  };

  const handleDelete = async () => {
    await makeFetchRequest(() => deleteProject(headers, projectId));
    setAnchorEl(null);
    setSnackbarIsOpen(true);
    setReloadProjects(prevState => !prevState);
  };

  return (
    <>
      <Icon
        $isVisible={isHovered}
        $mouseOn={mouseOn}
        $isClicked={isClicked}
        onClick={handleClick}
        onMouseOver={() => setMouseOn(true)}
        onMouseOut={() => setMouseOn(false)}
      />
      <PopupMenu anchorEl={anchorEl} handleClose={handleClose}>
        <PopupItem 
          text="Make a copy" 
          children={<BiCopy className="popup-icon"/>}
        />
        <PopupItem 
          text="Copy link" 
          children={<BiLink className="popup-icon" />}
        />
        <PopupItem 
          text="Delete" 
          children={<BiTrash className="popup-icon" />}
          handleClick={handleDelete}
        />
      </PopupMenu>
    </>
  );
};

export default Options;

const Icon = styled(BsThreeDots)`
  visibility: ${({ $isVisible }) => $isVisible ? "visible" : "hidden"};
  position: absolute;
  top: var(--tiny-space);
  right: var(--tiny-space);
  padding: var(--tiny-space);
  font-size: 1.4em;
  border-radius: var(--border-radius);
  background-color: ${({ $mouseOn, $isClicked }) => (
    $mouseOn || $isClicked ? "var(--main-yellow)" : null
  )};
  color: ${({ $mouseOn, $isClicked }) => (
    $mouseOn || $isClicked ? "white" : "var(--main-gray)"
  )};

`;