import { api } from './api'

export const editUserProfile = async (profile) =>
  await api.patch(`/users/me/`, profile)
