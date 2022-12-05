import create from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "../supabaseClient"

export type Channel = {
  id: string
  name: string
}

type ChannelsStore = {
  channels: Channel[]
  currentChannelId: number | null
  clearChannels: () => void
  getChannels: () => Promise<void>
  setCurrentChannelId: (c: number) => void
}

const useChannelsStore = create<ChannelsStore>()(
  persist(
    (set) => ({
      channels: [],
      clearChannels: () => set({ channels: [] }),
      currentChannelId: 1,
      getChannels: async () => {
        const { data: channels, error } = (await supabase
          .from("channels")
          .select("*")) as { data: Channel[]; error: any }

        if (error) console.error(error)
        if (channels) set({ channels })
      },
      setCurrentChannelId: (currentChannelId: number) =>
        set({ currentChannelId }),
    }),
    { name: "channelsStorage" }
  )
)

export default useChannelsStore
