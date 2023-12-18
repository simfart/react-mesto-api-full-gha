import { useMutation, useQueryClient } from 'react-query'
import { deleteCard } from '../api'
import { usePopups } from './usePopups'
import { useMemo } from 'react'

export const useDeleteCard = () => {
  const { closePopup } = usePopups()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deleteCard, {
    onSuccess: () => {
      closePopup()
      queryClient.invalidateQueries(['cards'])
    },
  })
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading])
}
