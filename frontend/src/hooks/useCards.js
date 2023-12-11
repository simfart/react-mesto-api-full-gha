import { useQuery } from 'react-query'
import { getCards } from '../api'

export const useCards = () => useQuery('cards', getCards)
