export const createProject = async (headers, body) => {
  const res = await fetch(`/api/projects`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  return await res.json();
};

export const getProject = async (headers, projectId) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "GET",
    headers: headers
  });

  return await res.json();
};

export const getAllProjectsFromUser = async (headers, userId) => {
  const res = await fetch(`/api/projects/user/${userId}`, {
    method: "GET",
    headers: headers
  });

  return await res.json();
};

export const addTask = async(headers, projectId, body) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(body)
  })

  return await res.json();
};