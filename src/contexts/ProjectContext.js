import { createContext, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getProject } from "../services/projects-api";
import { useSocketContext } from "./SocketContext";
import { useProfileContext } from "./ProfileContext";

const ProjectContext = createContext(null);

// export context as a custom hook
export const useProjectContext = () => useContext(ProjectContext);

// provider
export const ProjectProvider = ({ projectId, children }) => {
  const [project, isLoadingProject, setProject] = useFetch(getProject, projectId);
  const { authorizedUsers, createdBy } = project;
  const { profile: { _id: userId } } = useProfileContext();
  const navigate = useNavigate();
  
  // verify that the user is authorized on the project
  if (!isLoadingProject && !authorizedUsers.includes(userId) && createdBy !== userId) {
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
      console.log("getting it")
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

  }, [socket])

  return (
    <ProjectContext.Provider value={{
      project,
      isLoadingProject,
      setProject,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
