import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const editUserAvatar = async (avatar) => {
  try {
    return await axios.patch(
      `${apiUrl}/users/me/avatar/`,
      {
        avatar,
      },
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
