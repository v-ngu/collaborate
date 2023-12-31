import { styled } from "styled-components"

import { useProjectContext } from "../../contexts/ProjectContext";

import Toolbar from "../../components/Toolbar";
import InputField from "./InputField";
import ProjectIcon from "../../components/ProjectIcon";
import TeamMembers from "./TeamMembers";

const ProjectToolbar = () => {
  const { project } = useProjectContext();
  const { _id: projectId, projectColor, projectName } = project;

  return (
    <CustomToolbar>
      <Container>
        <ProjectIcon color={projectColor} size="large" />
        <InputField
          type="text"
          projectId={projectId}
          data={{ projectName: projectName }}
        />
      </Container>
      <TeamMembers projectId={projectId} />
    </CustomToolbar>
  );
};

export default ProjectToolbar;

const CustomToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  padding: var(--tiny-space) var(--standard-space);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;