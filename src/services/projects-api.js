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