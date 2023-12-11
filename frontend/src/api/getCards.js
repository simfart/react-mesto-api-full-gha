import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const getCards = async () => {
  return await axios
    .get(`${apiUrl}/cards/`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data)
}
