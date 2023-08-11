import { styled } from "styled-components";

const ContentContainer = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default ContentContainer;

const Container = styled.div`
  padding: var(--standard-space);
`;