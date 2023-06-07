// this component is used to create a new project only
// once created, the user is redirected the actual project page

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { useProfile } from "../contexts/ProfileContext";
import { createProject } from "../services/projects-api";

const NewProject = () => {
  const { profile: { _id: userId } } = useProfile();
  const [projectData] = useFetch(createProject, { userId });
  const { _id } = projectData || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      const timer = setTimeout(() => {
        navigate(`/project/${_id}`);
      }, 500);

      return () => clearTimeout(timer);
    };
  // eslint-disable-next-line
  }, [_id])

  return (
    <div>Loading new project</div>
  );
};

export default NewProject;