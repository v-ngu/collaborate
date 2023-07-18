import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components"
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleClick = async (event) => {
    event.preventDefault();
    await window.sessionStorage.removeItem("userAccessState")
    logout({ logoutParams: { returnTo: window.location.origin } })
  };

  return (
    <CustomLink onClick={handleClick}>
      Log Out
    </CustomLink>
  );
};

export default LogoutButton;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: var(--gray-blue);

  &:hover {
    color: var(--gray-blue);
  }
`;