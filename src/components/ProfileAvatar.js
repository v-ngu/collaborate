import { styled } from "styled-components";
import { Avatar } from "@mui/material";

const ProfileAvatar = ({ firstName, lastName, handleAvatarClick, $large }) => {
  const setAvatar = () => {
    const initials = firstName.charAt(0) + lastName.charAt(0);
  
    return ({
      sx: { bgcolor: "#FF5821"},
      children: initials.toUpperCase()
    })
  };
  
  return (
    <CustomAvatar
      $large={$large}
      onClick={handleAvatarClick}
      {...setAvatar()}
    />
  );
};

export default ProfileAvatar;

const CustomAvatar = styled(Avatar)`
  && {
    width: ${({ $large }) => $large ? "70px" : null};
    height: ${({ $large }) => $large ? "70px" : null};
    font-size: ${({ $large }) => $large ? "35px" : null};

    &:hover {
      cursor: ${({ $large }) => $large ? null : "pointer"};
    }
  }
`;