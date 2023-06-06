export const login = async (headers, userAuth0) => {
  const { sub: id, email } = userAuth0 || {};

  const res = await fetch(`/api/user`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ id, email })
  });

  return await res.json();
};