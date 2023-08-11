import { styled } from "styled-components";

const GeneralWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default GeneralWrapper;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1460px;
`;
