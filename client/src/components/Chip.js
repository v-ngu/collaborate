import { styled } from "styled-components";

const Chip = ({ priority }) => {
  const generateColor = () => {
    switch (priority) {
      case "Low":
        return "#A8C953";
      case "Medium":
       return "#F2DA70";
      default:
        return "#D85F5F";
    }
  };

  return (
    <Div $color={generateColor()}>
      <p>{priority}</p>
    </Div>
  );
};

export default Chip;

const Div = styled.div`
  padding: 3px;
  margin-top: var(--small-space);
  border-radius: 20px;
  background-color: ${({ $color }) => $color};
  width: 65px;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  align-self: flex-end;
`;
