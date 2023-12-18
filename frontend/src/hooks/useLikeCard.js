import { useMutation, useQueryClient } from 'react-query'
import { likeCard } from '../api'
import { useMemo } from 'react'
import { useRef } from 'react'

export const useLikeCard = () => {
  const { data: card } = useRef()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(likeCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cards'])
    },
  })
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading])
}
