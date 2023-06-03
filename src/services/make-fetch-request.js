const makeFetchRequest = async(api, accessToken) => {
  try {
    const data = await api(accessToken);
    if (data.error) throw new Error(data.error);
    return data;

  } catch (error) {
    console.log(error);
  }
};

export default makeFetchRequest;