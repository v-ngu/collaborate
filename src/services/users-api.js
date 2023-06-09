export const login = async (headers, userFromAuth0) => {
  const { sub, email } = userFromAuth0 || {};
  const id = sub.split("|")[1];

  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ id, email })
  });

  return await res.json();
};