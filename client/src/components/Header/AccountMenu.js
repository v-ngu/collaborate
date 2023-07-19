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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <PopupMenu anchorEl={anchorEl} handleClose={handleClose}>
      <AccountInfo>
        <ProfileAvatar size="large" firstName={firstName} lastName={lastName} />
        <div>
          <Name>{firstName} {lastName}</Name>
          <Email>{email}</Email>
        </div>
      </AccountInfo>
      <PopupItem text="Account settings" />
      <PopupItem text="Get help" />
      <PopupItem text="Privacy policy" />
      <PopupItem
        children={<LogoutButton>Sign out</LogoutButton>}
      />
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