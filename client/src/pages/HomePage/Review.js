import { styled } from "styled-components";
import GeneralWrapper from "../../components/GeneralWrapper";

const Review = () => {
  return (
    <Background>
      <GeneralWrapper>
        <Container>
          <Text>
            "Collaborate made our lives so much easier at the White House"
          </Text>
          <Author>Barack Obama</Author>
        </Container>
      </GeneralWrapper>
    </Background>
  );
};

export default Review;
const Background = styled.div`
  background-color: var(--main-beige);
`;

const Container = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--main-green);
`;

const Text = styled.h3`
  font-size: 25px;
  padding: var(--standard-space);
`;

const Author = styled.h3`
  font-size: 20px;
`;