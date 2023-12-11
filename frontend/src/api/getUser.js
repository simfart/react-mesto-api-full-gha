import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const getUser = async () => {
  return await axios
    .get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data)
}
