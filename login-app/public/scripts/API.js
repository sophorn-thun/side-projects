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

export const loginUser = async (user) => {
    return await makePostRequest(endpoint + "login", user);
};

export const registerUser = async (user) => {
    return await makePostRequest(endpoint + "register", user);
};

