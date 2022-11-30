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
  getCharmers: () => Promise<void>
}

const useCharmersStore = create<ChannelsStore>()(
  persist(
    (set) => ({
      charmers: [],
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
