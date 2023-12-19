import { api } from './api'

export const logout = async () => {
  return await api
    .get(`/signout`)
    .then((res) => res.data)
    .catch((err) => err)
}
