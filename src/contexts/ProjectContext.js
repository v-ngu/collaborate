import { createContext, useContext, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { getProject } from "../services/projects-api";
import { useSocketContext } from "./SocketContext";

const ProjectContext = createContext(null);

// export context as a custom hook
export const useProjectContext = () => useContext(ProjectContext);

// provider
export const ProjectProvider = ({ projectId, children }) => {
  const [project, isLoadingProject, setProject] = useFetch(getProject, projectId);

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

    // listeners
    socket.on("projects:task-added", handleAddedTask);

    return () => socket.off("projects:task-added");

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
