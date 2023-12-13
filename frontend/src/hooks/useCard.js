// import { useQuery } from 'react-query'
// import { getCards } from '../api'

// export const useCard = () => useQuery('cards', getCards)

import { useMutation, useQueryClient } from 'react-query'
import { deleteCard } from '../api'
import { usePopups } from './usePopups'
import { useMemo } from 'react'

export const useCard = (card) => {
  // const { closePopup } = usePopups()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deleteCard(card), {
    onSuccess: () => {
      // closePopup()
      queryClient.invalidateQueries(['card'])
    },
  })
  return useMemo(() => ({ mutate, isLoading }), [mutate, isLoading])
}
