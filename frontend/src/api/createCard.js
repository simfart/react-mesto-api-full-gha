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

