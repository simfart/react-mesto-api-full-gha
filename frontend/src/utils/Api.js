class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  getInitialUserCards() {
    return this._request(`${this._baseUrl}/cards/`, {
      credentials: "include",
      headers: this._headers,
    });
  }

  createNewCard(data) {
    return this._request(`${this._baseUrl}/cards/`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  setLikes(idCard, isLiked) {
    return this._request(`${this._baseUrl}/cards/${idCard}/likes/`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: "include",
    });
  }

  deleteCards(idCard) {
    return this._request(`${this._baseUrl}/cards/${idCard}/`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    });
  }

  getInitialUserInfo() {
    return this._request(`${this._baseUrl}/users/me/`, {
      headers: this._headers,
      credentials: "include",
    });
  }

  editlUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  editAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}
const token = localStorage.getItem("jwt");
const api = new Api({
  baseUrl: "http://localhost:3001",
  credentials: "include",
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;
