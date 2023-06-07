export const createProject = async (headers, body) => {
  const res = await fetch(`/api/projects`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  return await res.json();
};