const endpoint = "/auth/";

const makePostRequest = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};

const login = async (user) => {
  return await makePostRequest(endpoint + "login", user);
};

const register = async (user) => {
  return await makePostRequest(endpoint + "register", user);
};

export { login, register, makePostRequest };
