import { api } from './api'

export const getCards = async () =>
  await api.get(`/cards/`).then((res) => res.data)
