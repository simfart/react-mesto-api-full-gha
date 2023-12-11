import { useMutation, useQueryClient } from 'react-query'
import { editUserProfile } from '../api'
import { usePopups } from './usePopups'
import { useMemo } from 'react'

export const useEditUserProfileMutation = () => {
  const { closePopup } = usePopups()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(editUserProfile, {
    onSuccess: () => {
      closePopup()
      queryClient.invalidateQueries(['user'])
    },
  })
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading])
}
