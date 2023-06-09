export const createProject = async (headers, body) => {
  const res = await fetch(`/api/projects`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  return await res.json();
};

export const getAllProjectsFromUser = async (headers, userId) => {
  const res = await fetch(`/api/projects/${userId}`, {
    method: "GET",
    headers: headers
  });

  return await res.json();
};