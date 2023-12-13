import axios from 'axios'
import { apiUrl } from '../constants'
import { getAccessToken } from '../utils'

export const deleteCard = async (idCard) => {
  try {
    return await axios.delete(`${apiUrl}/cards/${idCard}/`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      withCredentials: true,
    })
  } catch (err) {
    throw err
  }
}
