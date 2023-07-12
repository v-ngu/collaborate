import { createContext, useContext } from "react";
import { useProfileContext } from "../contexts/ProfileContext";
import {  getAllProjectsFromUser, getSharedProjects } from "../services/projects-api";
import useFetch from "../hooks/useFetch";

const UserProjectsContext = createContext(null);

// export context as a custom hook
export const useUserProjectsContext = () => useContext(UserProjectsContext);

// provider
export const UserProjectsProvider = ({ children }) => {
  const { profile, isLoadingProfile } = useProfileContext();
  const { _id: userId } = profile;

  const [projects, isLoadingProjects] = useFetch(
    getAllProjectsFromUser, userId, isLoadingProfile, []
  );

  const [sharedProjects, isLoadingSharedProjects] = useFetch(
    getSharedProjects, userId, isLoadingProfile, []
  );

  const value = {
    projects,
    isLoadingProjects,
    sharedProjects,
    isLoadingSharedProjects
  }

  return (
    <UserProjectsContext.Provider value={value}>
      {children}
    </UserProjectsContext.Provider>
  )
};