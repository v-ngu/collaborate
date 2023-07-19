import { styled } from "styled-components";

const Toolbar = ({ className, children }) => {
  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

export default Toolbar;

const Wrapper = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px var(--large-padding);
`;