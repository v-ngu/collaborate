export const createProject = async (headers, body) => {
  const res = await fetch(`/api/projects`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  const json = await res.json();
  return json.data;
};

export const getProject = async (headers, projectId) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "GET",
    headers: headers
  });

  const json = await res.json();
  return json.data;
};

export const getAllProjectsFromUser = async (headers, userId) => {
  const res = await fetch(`/api/projects/user/${userId}`, {
    method: "GET",
    headers: headers
  });

  const json = await res.json();
  return json.data;
};

export const getSharedProjects = async (headers, userId) => {
  const res = await fetch(`/api/projects/shared/${userId}`, {
    method: "GET",
    headers: headers
  });

  const json = await res.json();
  return json.data;
};

export const updateProject = async (headers, projectId, body) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(body)
  });

  const json = await res.json();
  return json.data;
};

export const deleteProject = async (headers, projectId) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
    headers: headers
  });

  const json = await res.json();
  return json.data;
};