function request(url, method, body, token) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const config = {
    method,
    credentials: "include",
    headers,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  function getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }

  return fetch(`${BASE_URL}${url}`, config).then(getResponseData);
}

export const BASE_URL = "http://localhost:3001";

export const register = (data) => {
  return request("/signup", "POST", {
    email: data.email,
    password: data.password,
  });
};

export const authorize = (email, password) => {
  return request("/signin", "POST", { email, password });
};

export const checkToken = (token) => {
  return request("/users/me", "GET", undefined, token);
};

export const logout = () => {
  return request("/signout", "GET");
};
