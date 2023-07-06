// import basics
import { styled } from "styled-components";

// import custom hooks and contexts
import useFetch from "../../hooks/useFetch";
import { useProjectContext } from "../../contexts/ProjectContext";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TasksColumn from "./TasksColumn";
import TeamMembers from "./TeamMembers";

// import API
import { getTeamMembersForProject } from "../../services/users-api";

// ProjectPage component
const ProjectPage = () => {
  // states and contexts
  const { project, isLoadingProject } = useProjectContext();
  const { _id: projectId, projectLists } = project;

  const [teamMembers, _isLoadingTeamMembers, setTeamMembers] = useFetch(
    getTeamMembersForProject, projectId, isLoadingProject, []
  );

  // rendering
  if (isLoadingProject) return <LoadingCircle />

  return (
    <Wrapper>
      <Container>
        {projectLists.map((list, index) => (
          <TasksColumn key={list.column} column={list.column} columnIndex={index} />
        ))}
        <div>
          <p>Team Members</p>
          <TeamMembers teamMembers={teamMembers} setTeamMembers={setTeamMembers} />
        </div>
      </Container>
    </Wrapper>
  );
};

export default ProjectPage;

const Wrapper = styled.div`
`;
const Container = styled.div`
  display: flex;
`;

// Refactor team members section into it's own component