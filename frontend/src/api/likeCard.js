import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const toggleCardLike = async ({ card, isLiked }) => {
  if (isLiked) {
    return await dislikeCard({ card })
  } else {
    return await likeCard({ card })
  }
}

export const likeCard = async ({ card }) => {
  return await axios.put(
    `${apiUrl}/cards/${card}/likes`,
    { card },
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      withCredentials: true,
    },
  )
}

const dislikeCard = async ({ card }) => {
  return await axios.delete(`${apiUrl}/cards/${card}/likes`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
  })
}
