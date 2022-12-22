import create from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "../supabaseClient"

export type Charmer = {
  id: string
  name: string
  is_online: boolean
}

type ChannelsStore = {
  charmers: Charmer[]
  clearCharmers: () => void
  selectedCharmer: string | null
  setSelectedCharmer: (id: string | null) => void
  setCharmerOnlineStatus: (id: string, isOnline: boolean) => void
  getCharmers: () => Promise<void>
}

const useCharmersStore = create<ChannelsStore>()(
  persist(
    (set, get) => ({
      charmers: [],
      selectedCharmer: null,
      setSelectedCharmer: (selectedCharmer: string | null) =>
        set({ selectedCharmer }),
      setCharmerOnlineStatus: (id: string, isOnline: boolean) => {
        const charmers = get().charmers
        const index = charmers.findIndex((charmer) => charmer.id === id)

        set({
          charmers: [
            ...charmers.slice(0, index),
            { ...charmers[index], is_online: isOnline },
            ...charmers.slice(index + 1),
          ],
        })
      },
      clearCharmers: () => set({ charmers: [] }),
      getCharmers: async () => {
        const { data: charmers, error } = await supabase
          .from("charmers")
          .select("*")

        if (error) console.error(error)
        if (charmers) set({ charmers })
      },
    }),
    { name: "charmersStorage" }
  )
)

export default useCharmersStore
