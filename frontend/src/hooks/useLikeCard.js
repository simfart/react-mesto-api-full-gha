import { useMutation, useQueryClient } from 'react-query'
import { toggleCardLike } from '../api'
import { useMemo } from 'react'

export const useLikeCard = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(toggleCardLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cards'])
    },
  })
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading])
}
