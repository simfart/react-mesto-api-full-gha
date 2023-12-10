import { useContext } from 'react'
import { PopupsContext } from '../component/Popups'

export const usePopups = () => useContext(PopupsContext)
