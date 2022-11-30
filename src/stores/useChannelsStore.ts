import create from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "../supabaseClient"

export type Channel = {
  id: string
  name: string
}

type ChannelsStore = {
  channels: Channel[]
  getChannels: () => Promise<void>
}

const useChannelsStore = create<ChannelsStore>()(
  persist(
    (set) => ({
      channels: [],
      getChannels: async () => {
        const { data: channels, error } = await supabase
          .from("channels")
          .select("*")

        if (error) console.error(error)
        if (channels) set({ channels })
      },
    }),
    { name: "channelsStorage" }
  )
)

export default useChannelsStore
