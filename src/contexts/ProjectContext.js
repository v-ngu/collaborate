import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { getProject } from "../services/projects-api";

const ProjectContext = createContext(null);

// export context as a custom hook
export const useProjectContext = () => useContext(ProjectContext);

// provider
export const ProjectProvider = ({ projectId, children }) => {
  const [project, isLoadingProject, setProject] = useFetch(getProject, projectId);

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
