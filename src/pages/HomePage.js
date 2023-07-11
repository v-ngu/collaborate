import { styled } from "styled-components";

import homepage from "../assets/homepage.jpg";
import LoginButton from "../components/buttons/LoginButton";
import Toolbar from "../components/Toolbar";
import Button from "../components/buttons/Button";

const HomePage = () => {
  return (
    <div>
      <Toolbar>
        <Logo>Collaborate</Logo>
        <LoginButton />
      </Toolbar>
      <Container>
        <Textfield>
          <Title>Create Kanban boards, collaborate in real-time</Title>
          <Subtitle>
            Manage your projects from anywhere. You'll see who is online and offline, live updates, and what task is being edited.
          </Subtitle>
          <Button>Get Started</Button>
        </Textfield>
        <Img src={homepage} alt="Home Image" />
      </Container>
    </div>
  );
};

export default HomePage;

const Container = styled.div`
  padding: var(--large-padding);
  display: flex;
  align-items: flex-start;
  position: relative;
`;

const Logo = styled.h1`
  font-family: "Caprasimo", serif;
`;

const Textfield = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;
  z-index: 10;
  position: absolute;
`;

const Title = styled.h1`
  font-size: 55px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  width: 77%;
  margin-bottom: 30px;
`;

const Img = styled.img`
  width: 41%;
  max-width: 650px;
  align-self: flex-end;
  position: relative;
  left: 55%;
  top: 135px;
`;