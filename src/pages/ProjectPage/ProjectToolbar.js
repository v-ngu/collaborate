import { styled } from "styled-components"

import { useProjectContext } from "../../contexts/ProjectContext";

import Toolbar from "../../components/Toolbar";
import InputField from "./InputField";
import ProjectIcon from "../../components/ProjectIcon";

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
    </CustomToolbar>
  );
};

export default ProjectToolbar;

const CustomToolbar = styled(Toolbar)`
  padding: var(--tiny-padding) var(--standard-padding);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;