import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const editUserProfile = async (profile) => {
  try {
    return await axios.patch(`${apiUrl}/users/me/`, profile, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      withCredentials: true,
    })
  } catch (err) {
    throw err
  }
}
