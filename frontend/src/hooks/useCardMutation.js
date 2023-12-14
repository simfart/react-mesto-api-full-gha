import { useMutation, useQueryClient } from 'react-query'
import { deleteCard } from '../api'
import { usePopups } from './usePopups'
import { useMemo } from 'react'

export const useCardMutation = () => {
  const { closePopup } = usePopups()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deleteCard, {
    onSuccess: () => {
      closePopup()
      queryClient.invalidateQueries(['card'])
    },
  })
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading])
}
