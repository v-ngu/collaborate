import { styled } from "styled-components";
import LoadingCircle from '../components/LoadingCircle';

const LoadingPage = () => {
  return (
    <Wrapper>
      <LoadingCircle />
    </Wrapper>
  );
};

export default LoadingPage;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;