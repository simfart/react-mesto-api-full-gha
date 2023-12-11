import axios from 'axios'
import { apiUrl } from '../constants'

export const getUser = async () => {
  return await axios
    .get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data)
}
