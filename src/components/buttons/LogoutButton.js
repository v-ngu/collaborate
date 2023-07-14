import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components"

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleClick = async (event) => {
    event.preventDefault();
    await window.sessionStorage.removeItem("userAccessState")
    logout({ logoutParams: { returnTo: window.location.origin } })
  };

  return (
    <Anchor href="" onClick={handleClick}>
      Log Out
    </Anchor>
  );
};

export default LogoutButton;

const Anchor = styled.a`
  text-decoration: none;
  color: var(--gray-blue);

  &:hover {
    color: var(--gray-blue);
  }
`;