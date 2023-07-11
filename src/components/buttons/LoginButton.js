import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleClick = async () => {
    await window.sessionStorage.setItem("userAccessState", "In Progress")
    loginWithRedirect()
  };

  return (
    <Button handleClick={handleClick}>Log In</Button>
  );
};

export default LoginButton;