import { api } from './api'

export const register = async (payload) => {
  return await api.post(`/signup`, payload).then((res) => res.data)
}
