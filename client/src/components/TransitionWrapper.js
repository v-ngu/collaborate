import { styled } from "styled-components";
import { useMenuDrawerContext } from "../contexts/MenuDrawerContext";

const TransitionWrapper = ({ children }) => {
  const { isMenuDrawerOpen } = useMenuDrawerContext();

  return (
    <Wrapper $isMenuDrawerOpen={isMenuDrawerOpen}>
      {children}
    </Wrapper>
  );
};

export default TransitionWrapper;

const Wrapper = styled.div`
  height: calc(100vh - 57px);
  overflow-y: auto;
  width: ${({ $isMenuDrawerOpen }) => $isMenuDrawerOpen ? "calc(100vw - 251px)" : "100vw"};
  transform: ${({ $isMenuDrawerOpen }) => $isMenuDrawerOpen ? "translateX(251px)" : null};
  transition-property: transform, width;
  transition-duration: 500ms;
  transition-timing-function: ${({ $isMenuDrawerOpen }) => (
    $isMenuDrawerOpen ? "cubic-bezier(0, 0, 0.2, 1)" : "cubic-bezier(0.4, 0, 0.6, 1)"
  )};
`;