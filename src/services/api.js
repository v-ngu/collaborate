export const getProfile = async (headers) => {
  const res = await fetch('/api/user', {
    method: "GET",
    headers: headers
  });

  return await res.json();
};