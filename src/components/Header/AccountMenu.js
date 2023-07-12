import { styled } from "styled-components";
import { Menu } from "@mui/material"
import { useProfileContext } from "../../contexts/ProfileContext";
import ProfileAvatar from "../ProfileAvatar";
import LogoutButton from "../buttons/LogoutButton";

const AccountMenu = ({ anchorEl, setAnchorEl }) => {
  const {
    profile: { firstName, lastName, email },
    isLoadingProfile
  } = useProfileContext();


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CustomMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <AccountInfo>
        <ProfileAvatar $large={true} firstName={firstName} lastName={lastName} />
        <div>
          <Name>{firstName} {lastName}</Name>
          <Email>{email}</Email>
        </div>
      </AccountInfo>
      <Action>Account settings</Action>
      <Action>Get help</Action>
      <Action>Privacy policy</Action>
      <Action>
        <LogoutButton>Sign out</LogoutButton>
      </Action>
    </CustomMenu>
  );
};

export default AccountMenu;

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
const AccountInfo = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid var(--light-gray);
  padding: var(--standard-padding);
`;
const Name = styled.p`
  font-weight: bold;
`;
const Email = styled.p`
  font-size: 0.7em;
  color: gray;
`;
const Action = styled.li`
  padding: var(--standard-padding);

  &:hover {
    background-color: rgba(219, 218, 219, 0.4);
    cursor: pointer;
  }
`;