import { useState } from "react";
import { styled } from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import PopupMenu from "../../components/PopupMenu";
import PopupItem from "../../components/PopupItem";
import { BiCopy, BiLink, BiTrash } from "react-icons/bi";

const Options = ({ isHovered, setIsHovered }) => {
  const [mouseOn, setMouseOn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setIsClicked(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsClicked(false);
    setIsHovered(false);
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
        />
      </PopupMenu>
    </>
  );
};

export default Options;

const Icon = styled(BsThreeDots)`
  visibility: ${({ $isVisible }) => $isVisible ? "visible" : "hidden"};
  position: absolute;
  top: var(--tiny-padding);
  right: var(--tiny-padding);
  padding: var(--tiny-padding);
  font-size: 1.4em;
  border-radius: 5px;
  background-color: ${({ $mouseOn, $isClicked }) => (
    $mouseOn || $isClicked ? "var(--light-green)" : null
  )};
  color: ${({ $mouseOn, $isClicked }) => (
    $mouseOn || $isClicked ? "white" : "var(--gray-blue)"
  )};

`;