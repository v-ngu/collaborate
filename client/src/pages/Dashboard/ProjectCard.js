import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import Options from "./Options";

const ProjectCard = ({ project, setSnackbarIsOpen }) => {
  const { _id, projectName, screenshot } = project;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Link to={`/project/${_id}`}>
        <Container>
          <Screenshot src={screenshot} alt="" />
        </Container>
        <ProjectName>{projectName}</ProjectName>
      </Link>
      <Options
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        projectId={_id}
        setSnackbarIsOpen={setSnackbarIsOpen}
      />
    </Wrapper>
  );
};

export default ProjectCard;

const Wrapper = styled.div`
  cursor: pointer;
  flex: 0 calc(20% - var(--standard-space));
  position: relative;
`;
const Container = styled.div`
  width: 100%;
  padding-top: 40%;
  background-color: var(--ultra-light-gray);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const Screenshot = styled.img`
  width: 85%;
`;
const ProjectName = styled.p`
  font-weight: bold;
  padding-top: var(--small-space);
`;