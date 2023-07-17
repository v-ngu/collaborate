import { styled } from "styled-components";
import { Avatar } from "@mui/material";

const ProfileAvatar = ({ firstName, lastName, handleAvatarClick, size }) => {
  const circleSize = {
    small: "30px",
    large: "70px"
  };

  const fontSize = {
    small: "15px",
    large: "35px"
  }

  const setAvatar = () => {
    const initials = firstName.charAt(0) + lastName.charAt(0);
  
    return ({
      sx: { bgcolor: "#FF5821"},
      children: initials.toUpperCase()
    })
  };
  
  return (
    <CustomAvatar
      $circleSize={circleSize[size]}
      $fontSize={fontSize[size]}
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

    &:hover {
      cursor: ${({ $circleSize }) => $circleSize !== "70px" ? "pointer" : null};
    }
  }
`;