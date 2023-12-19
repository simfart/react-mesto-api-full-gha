import { api } from './api'

export const getUser = async () =>
  await api.get(`/users/me`).then((res) => res.data)
