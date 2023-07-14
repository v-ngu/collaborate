import { styled } from "styled-components";
import { useProfileContext } from "../../contexts/ProfileContext";
import ProfileAvatar from "../ProfileAvatar";
import LogoutButton from "../buttons/LogoutButton";
import PopupMenu from "../PopupMenu";
import PopupItem from "../PopupItem";

const AccountMenu = ({ anchorEl, setAnchorEl }) => {
  const {
    profile: { firstName, lastName, email }
  } = useProfileContext();

  return (
    <PopupMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
      <AccountInfo>
        <ProfileAvatar $large={true} firstName={firstName} lastName={lastName} />
        <div>
          <Name>{firstName} {lastName}</Name>
          <Email>{email}</Email>
        </div>
      </AccountInfo>
      <PopupItem>Account settings</PopupItem>
      <PopupItem>Get help</PopupItem>
      <PopupItem>Privacy policy</PopupItem>
      <PopupItem>
        <LogoutButton>Sign out</LogoutButton>
      </PopupItem>
    </PopupMenu>
  );
};

export default AccountMenu;

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