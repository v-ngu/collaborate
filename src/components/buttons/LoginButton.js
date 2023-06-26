import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleClick = async () => {
    await window.sessionStorage.setItem("userAccessState", "In Progress")
    loginWithRedirect()
  };

  return <button onClick={handleClick}>Log In</button>;
};

export default LoginButton;