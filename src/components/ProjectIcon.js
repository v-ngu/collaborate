import { styled } from "styled-components";

const ProjectIcon = ({ color, size }) => {
  return (
    <Icon $color={color} $size={size}></Icon>
  );
};

export default ProjectIcon;

const Icon = styled.div`
  width: ${({$size}) => $size === "large" ? "30px" : "16px"};
  height: ${({$size}) => $size === "large" ? "30px" : "16px"};
  border-radius: ${({$size}) => $size === "large" ? "7px" : "4px"};
  background-color: ${({$color}) => $color};
`;