import axios from 'axios'
import { useUserStore } from '../store'
import { apiUrl } from '../constants'

export const api = axios.create({
  baseURL: apiUrl,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.withCredentials = true
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        useUserStore.getState().setIsLoggedIn(false)
        // const refreshToken = localStorage.getItem('refreshToken')
        // const response = await axios.post('/api/refresh-token', {
        //   refreshToken,
        // })
        // const { token } = response.data

        // localStorage.setItem('token', token)

        // // Retry the original request with the new token
        // originalRequest.headers.Authorization = `Bearer ${token}`
        // return axios(originalRequest)
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error)
  },
)
