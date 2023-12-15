import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const likeCard = async (card, isLiked) => {
  try {
    return await (isLiked ? axios.delete : axios.put)(
      `${apiUrl}/cards/${card}/likes`,
      { card },
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
