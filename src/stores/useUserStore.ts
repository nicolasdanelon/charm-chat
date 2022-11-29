import create from "zustand"
import { persist } from "zustand/middleware"

export type User = {
  name: string
  email: string
  id: string
}

type UserStore = {
  user: User | null
  setUser: (user: User | null) => void
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => {
        set({ user })
      },
    }),
    {
      name: "userStorage",
    }
  )
)

export default useUserStore
