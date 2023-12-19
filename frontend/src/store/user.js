import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useUserStore = create(
  devtools(
    immer((set) => ({
      isLoggedIn: !!window.localStorage.getItem('jwt'),
      setIsLoggedIn: (payload) =>
        set((state) => {
          state.isLoggedIn = payload
        }),
    })),
  ),
)
