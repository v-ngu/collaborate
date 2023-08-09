export const login = async (headers, userFromAuth0) => {
  const { sub, email } = userFromAuth0 || {};
  const id = sub.split("|")[1];

  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ id, email })
  });

  const json =  await res.json();
  return json.data;
};

export const getTeamMembersForProject = async (headers, projectId) => {
  const res = await fetch(`/api/team/project/${projectId}`, {
    method: "GET",
    headers: headers
  });

  const json = await res.json();
  return json.data;
};