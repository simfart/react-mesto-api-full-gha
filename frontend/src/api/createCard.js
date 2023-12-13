import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const createCard = async (card) => {
  try {
    return await axios.post(
      `${apiUrl}/cards/`, card,

      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        withCredentials: true,
      },
    )
  } catch (err) {
    throw err
  }
}


// createNewCard(data) {
//   return this._request(`${this._baseUrl}/cards/`, {
//     method: "POST",
//     credentials: "include",
//     headers: this._headers,
//     body: JSON.stringify({
//       name: data.name,
//       link: data.link,
//     }),
//   });
// }

