import { styled } from "styled-components";

const ProjectIcon = ({ color }) => {
  return (
    <Icon $color={color}></Icon>
  );
};

export default ProjectIcon;

const Icon = styled.div`
  width: 16px;
  height: 16px; 
  border-radius: 4px;
  background-color: ${({$color}) => $color};
`;