import { styled } from "styled-components";
import { Avatar } from "@mui/material";

const ProfileAvatar = ({ firstName, lastName, handleAvatarClick, size, bgColor }) => {
  const circleSize = {
    small: "25px",
    large: "70px"
  };

  const fontSize = {
    small: "12px",
    large: "35px"
  }

  const setAvatar = () => {
    const initials = firstName.charAt(0) + lastName.charAt(0);
  
    return ({
      children: initials.toUpperCase()
    })
  };
  
  return (
    <CustomAvatar
      $circleSize={circleSize[size]}
      $fontSize={fontSize[size]}
      $bgColor={bgColor}
      onClick={handleAvatarClick}
      {...setAvatar()}
    />
  );
};

export default ProfileAvatar;

const CustomAvatar = styled(Avatar)`
  && {
    width: ${({ $circleSize }) => $circleSize};
    height: ${({ $circleSize }) => $circleSize};
    font-size: ${({ $fontSize }) => $fontSize};
    background-color: ${({$bgColor}) => $bgColor ? $bgColor : "#FF5821"};

    &:hover {
      cursor: ${({ $circleSize }) => $circleSize !== "70px" ? "pointer" : null};
    }
  }
`;