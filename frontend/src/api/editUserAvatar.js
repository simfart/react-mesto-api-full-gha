import { api } from './api'

export const editUserAvatar = async (avatar) =>
  await api.patch(`/users/me/avatar/`, {
    avatar,
  })
