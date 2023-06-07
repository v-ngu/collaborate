export const login = async (headers, userFromAuth0) => {
  const { sub: id, email } = userFromAuth0 || {};

  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ id, email })
  });

  return await res.json();
};