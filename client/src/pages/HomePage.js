import { styled } from "styled-components";

import homepage from "../assets/homepage.jpg";
import board from "../assets/board.png";
import LoginButton from "../components/buttons/LoginButton";
import Toolbar from "../components/Toolbar";
import Button from "../components/buttons/Button";

const HomePage = () => {
  return (
    <div>
      <Background $color={"var(--main-green)"}>
        <Wrapper>
          <Toolbar>
            <Logo>Collaborate</Logo>
            <LoginButton />
          </Toolbar>
          <MainContainer>
            <MainTextfield>
              <Title>Optimizing teamwork starts here.</Title>
              <CallToAction>Get Started</CallToAction>
            </MainTextfield>
            <Img src={homepage} alt="Home Image" />
          </MainContainer>
        </Wrapper>
      </Background>
      <Wrapper>
        <Container>
          <Img src={board} alt="Board Screenshot" />
          <TextContainer>
            <Textfield>
              <SubTitle>Create Kanban boards</SubTitle>
              <p>
                A Kanban board is a form of visual project management that
                allows you to plot out projects and workflows using columns and
                cards.
              </p>
            </Textfield>
            <Textfield>
              <SubTitle>Shared vision</SubTitle>
              <p>
                Quickly visualize your team's processes, systems, and
                organizational structure. Intelligent diagramming lets you
                visualize complex ideas faster, clearer and more
                collaboratively.
              </p>
            </Textfield>
          </TextContainer>
        </Container>
      </Wrapper>
      <Background $color={"var(--main-beige)"}>
        <Wrapper>
          <ReviewContainer>
            <Review>
              "Collaborate made our lives so much easier at the White House"
            </Review>
            <Review>Barack Obama</Review>
          </ReviewContainer>
        </Wrapper>
      </Background>
      <Background $color="black">
        <Wrapper>
          <Footer>
            <p>© 2023 Collaborate, Inc.</p>
          </Footer>
        </Wrapper>
      </Background>
    </div>
  );
};

export default HomePage;

const Background = styled.div`
  background-color: ${({ $color }) => $color};
`;

const Logo = styled.h1`
  font-family: "Caprasimo", serif;
  color: var(--main-beige);
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1460px;
`;

const MainContainer = styled.div`
  padding-top: var(--tiny-space);
  padding-left: var(--large-space);
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  padding: var(--large-space);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TextContainer = styled.div`
  width: 400px;
`;

const ReviewContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainTextfield = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: var(--large-space);
  width: 65%;
  color: var(--main-beige);
`;

const Textfield = styled.div`
  margin-bottom: var(--standard-space);
`;

const Title = styled.h1`
  font-size: 55px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--standard-space);
`;

const SubTitle = styled.h2`
  color: var(--main-green);
  font-weight: 700;
  margin-bottom: var(--tiny-space);
`;

const Img = styled.img`
  width: 40%;
`;

const CallToAction = styled(Button)`
  align-self: flex-start;
  margin-top: var(--standard-space);
`;

const Review = styled.h3`
  color: var(--main-green);
  font-size: 25px;
  padding: var(--tiny-space);
`;

const Footer = styled.div`
  height: 600px;
  color: white;
  padding: var(--large-space);
`;
