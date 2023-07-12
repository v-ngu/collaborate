// import basics
import { createContext, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import hooks and contexts
import useFetch from "../hooks/useFetch";
import { useSocketContext } from "./SocketContext";
import { useProfileContext } from "./ProfileContext";

// import apis
import { getProject } from "../services/projects-api";
import { getTeamMembersForProject } from "../services/users-api";

const ProjectContext = createContext(null);

// export context as a custom hook
export const useProjectContext = () => useContext(ProjectContext);

// provider
export const ProjectProvider = ({ projectId, children }) => {
  // states
  const [
    project,
    isLoadingProject,
    setProject,
    setReloadProject
  ] = useFetch(getProject, projectId);
  const { authorizedUsers, createdBy } = project;

  const [
    teamMembers,
    isLoadingTeamMembers,
    setTeamMembers,
    setReloadTeam
  ] = useFetch(getTeamMembersForProject, projectId, false, []);

  const { profile: { _id: userId } } = useProfileContext();

  const navigate = useNavigate();

  // verify that the user is authorized on the project
  if (
    !isLoadingProject
    && !authorizedUsers.includes(userId)
    && createdBy !== userId
  ) {
    navigate("/404");
  };

  const socket = useSocketContext();

  // project state is saved into a ref for the useEffect
  // otherwise the callback inside the useffect uses the initial state...
  const projectRef = useRef();
  projectRef.current = project;

  // update project after adding a new task, listening from server
  useEffect(() => {
    if (!socket) return;

    // handlers
    const handleAddedTask = ({ columnIndex, addedTask }) => {
      const newState = { ...projectRef.current };
      newState.projectLists[columnIndex].tasks.unshift(addedTask);
      setProject(newState);
    };

    const handleDndUpdated = ({ projectLists }) => {
      const newState = { ...projectRef.current };
      newState.projectLists = projectLists;
      setProject(newState);
    };

    // listeners
    socket.on("projects:task-added", handleAddedTask);
    socket.on("projects:dnd-updated", handleDndUpdated);

    return () => {
      socket.off("projects:task-added");
      socket.off("projects:dnd-updated");
    }

  }, [socket, setProject])

  // reload project data on projecId change
  useEffect(() => {
    setReloadProject(prevState => !prevState);
    setReloadTeam(prevState => !prevState);
  }, [projectId, setReloadProject, setReloadTeam])

  return (
    <ProjectContext.Provider value={{
      project,
      isLoadingProject,
      setProject,
      setReloadProject,
      teamMembers,
      isLoadingTeamMembers,
      setTeamMembers,
      setReloadTeam
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
