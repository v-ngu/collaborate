// import basics
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

// import custom hooks and contexts
import { useProfileContext } from "../../contexts/ProfileContext";
import { useUserProjectsContext } from "../../contexts/UserProjectsContext";
import useHeaders from "../../hooks/useHeaders";

// import utils
import makeFetchRequest from "../../utils/make-fetch-request";

// import APIs
import { createProject } from "../../services/projects-api";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TransitionWrapper from "../../components/TransitionWrapper";
import ContentContainer from "../../components/ContentContainer";
import Toolbar from "../../components/Toolbar";
import Button from "../../components/buttons/Button";
import ProjectCard from "./ProjectCard";

// Dashboard component
const Dashboard = () => {
  const [headers, isLoadingHeaders] = useHeaders();

  const { profile } = useProfileContext();
  const { _id: userId } = profile;

  const {
    projects,
    isLoadingProjects,
    setReloadProjects,
    sharedProjects,
    isLoadingSharedProjects,
    setReloadSharedProjects
  } = useUserProjectsContext();

  const navigate = useNavigate();

  // utils
  const createNewProject = async (e) => {
    e.preventDefault();
    if (!isLoadingHeaders) {
      const newProjectId = await makeFetchRequest(() => createProject(headers, { userId }));
      console.log(`New project ${newProjectId} has been created`);
      setReloadProjects(prevState => !prevState);
      setReloadSharedProjects(prevState => !prevState);
      navigate(`/project/${newProjectId}`);
    }
  };

  return (
    <TransitionWrapper>
      <DashboardToolbar>
        <Title>Dashboard</Title>
        <Button handleClick={createNewProject}>Create a new project</Button>
      </DashboardToolbar>
      <ContentContainer>
        <Subtitle>My Projects</Subtitle>
        <Container>
          {
            isLoadingProjects
              ? <LoadingCircle />
              : projects.map(project => <ProjectCard key={project["_id"]} project={project} />)
          }
        </Container>
        <Subtitle>Projects Shared with me</Subtitle>
        {
          isLoadingSharedProjects
            ? <LoadingCircle />
            : sharedProjects.map(project => <ProjectCard key={project["_id"]} project={project} />)
        }
      </ContentContainer>
    </TransitionWrapper>
  );
};

export default Dashboard;

const DashboardToolbar = styled(Toolbar)`
  padding: var(--standard-padding);
`;

const Title = styled.h1`
  font-weight: bold;
`;
const Subtitle = styled.h3`
  font-weight: bold;
  margin-bottom: var(--standard-margin);
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px var(--standard-padding);
  margin-bottom: 30px;
`;