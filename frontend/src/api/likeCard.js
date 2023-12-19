import { api } from './api'

export const toggleCardLike = async ({ card, isLiked }) => {
  if (isLiked) {
    return await dislikeCard({ card })
  } else {
    return await likeCard({ card })
  }
}

export const likeCard = async ({ card }) =>
  await api.put(`/cards/${card}/likes`, { card })

const dislikeCard = async ({ card }) => await api.delete(`/cards/${card}/likes`)
