import { useMutation, useQueryClient } from 'react-query'
import { deleteCard } from '../api'
import { usePopups } from './usePopups'
import { useMemo } from 'react'
import { useRef } from 'react'

export const useDeleteCard = () => {
  const { closePopup } = usePopups()
  //
  const { data: card } = useRef()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deleteCard, {
    onSuccess: () => {
      closePopup()
      queryClient.invalidateQueries()
    },
  })
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading])
}
