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

  const [
    projects, 
    isLoadingProjects, 
    setProjects, 
    setReloadProjects
  ] = useFetch(
    getAllProjectsFromUser, userId, isLoadingProfile, []
  );

  const [
    sharedProjects, 
    isLoadingSharedProjects, 
    setSharedProjects, 
    setReloadSharedProjects
  ] = useFetch(
    getSharedProjects, userId, isLoadingProfile, []
  );

  const value = {
    projects,
    isLoadingProjects,
    setProjects, 
    setReloadProjects,
    sharedProjects,
    isLoadingSharedProjects,
    setSharedProjects, 
    setReloadSharedProjects
  }

  return (
    <UserProjectsContext.Provider value={value}>
      {children}
    </UserProjectsContext.Provider>
  )
};