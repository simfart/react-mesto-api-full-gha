import { api } from './api'

export const createCard = async (card) => await api.post(`/cards/`, card)
