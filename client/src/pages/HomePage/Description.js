import { styled } from "styled-components";
import GeneralWrapper from "../../components/GeneralWrapper";
import board from "../../assets/board.png";

const Description = () => {
  return (
    <GeneralWrapper>
      <Container>
        <Img src={board} alt="Board Screenshot" />
        <TextContainer>
          <Textfield>
            <Title>Create Kanban boards</Title>
            <p>
              A Kanban board is a form of visual project management that allows
              you to plot out projects and workflows using columns and cards.
            </p>
          </Textfield>
          <Textfield>
            <Title>Shared vision</Title>
            <p>
              Quickly visualize your team's processes, systems, and
              organizational structure. Intelligent diagramming lets you
              visualize complex ideas faster, clearer and more collaboratively.
            </p>
          </Textfield>
        </TextContainer>
      </Container>
    </GeneralWrapper>
  );
};

export default Description;

const Container = styled.div`
  padding: var(--large-space);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Img = styled.img`
  width: 40%;
`;

const TextContainer = styled.div`
  width: 400px;
`;

const Textfield = styled.div`
  margin-bottom: var(--standard-space);
`;

const Title = styled.h2`
  color: var(--main-green);
  font-weight: 700;
  margin-bottom: var(--tiny-space);
`;