import { styled } from "styled-components";
import GeneralWrapper from "../../components/GeneralWrapper";
import LoginButton from "../../components/buttons/LoginButton";
import Toolbar from "../../components/Toolbar";
import Button from "../../components/buttons/Button";
import homepage from "../../assets/homepage.jpg";

const Main = () => {
  return (
    <Background>
      <GeneralWrapper>
        <Toolbar>
          <Logo>Collaborate</Logo>
          <LoginButton />
        </Toolbar>
        <Container>
          <Textfield>
            <Title>Optimizing teamwork starts here.</Title>
            <CallToAction>Get Started</CallToAction>
          </Textfield>
          <Img src={homepage} alt="Home Image" />
        </Container>
      </GeneralWrapper>
    </Background>
  );
};

export default Main;

const Background = styled.div`
  background-color: var(--main-green);
`;

const Logo = styled.h1`
  font-family: "Caprasimo", serif;
  color: var(--main-beige);
`;

const Container = styled.div`
  padding-top: var(--tiny-space);
  padding-left: var(--large-space);
  display: flex;
  align-items: center;
`;

const Textfield = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: var(--large-space);
  width: 65%;
  color: var(--main-beige);
`;

const Title = styled.h1`
  font-size: 55px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--standard-space);
`;

const CallToAction = styled(Button)`
  align-self: flex-start;
  margin-top: var(--standard-space);
`;

const Img = styled.img`
  width: 40%;
`;