import { api } from './api'

export const login = async (payload) =>
  await api.post(`/signin`, payload).then((res) => res.data)
