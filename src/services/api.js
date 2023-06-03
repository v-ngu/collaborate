export const getPrivate = async (accessToken) => {
  const res = await fetch('/api/private', {
      method: "GET",
      headers: {
        "authorization": `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    }
  );
  return await res.json();
};