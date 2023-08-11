import { styled } from "styled-components";
import GeneralWrapper from "../../components/GeneralWrapper";

const Footer = () => {
  return (
    <Background>
      <GeneralWrapper>
        <Text>© 2023 Collaborate, Inc.</Text>
      </GeneralWrapper>
    </Background>
  );
};

export default Footer;
const Background = styled.div`
  background-color: var(--main-beige);
`;

const Text = styled.p`
  color: var(--main-green);
  padding: var(--large-space);
`;
