import { api } from './api'

export const deleteCard = async (card) => await api.delete(`/cards/${card}`)
