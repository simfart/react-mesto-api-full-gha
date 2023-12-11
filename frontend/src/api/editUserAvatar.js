import axios from 'axios'
import { apiUrl } from '../constants'

export const editUserAvatar = async (avatar) => {
  try {
    return await axios.patch(
      `${apiUrl}/users/me/avatar/`,
      {
        avatar,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
        },
        withCredentials: true,
      },
    )
  } catch (err) {
    throw err
  }
}
