import create from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "../supabaseClient"

export type Channel = {
  id: number
  name: string
}

type ChannelsStore = {
  channels: Channel[]
  addChannel: (c: Channel) => void
  currentChannelId: number | null
  currentChannelName: string
  clearChannels: () => void
  getChannels: () => Promise<void>
  setCurrentChannelId: (c: number | null) => void
  setCurrentChannelName: (n: string) => void
}

const useChannelsStore = create<ChannelsStore>()(
  persist(
    (set) => ({
      channels: [],
      addChannel: (c: Channel) => set(({ channels }) => ({ channels: [...channels, c] })),
      clearChannels: () => set({ channels: [] }),
      currentChannelId: 1,
      currentChannelName: "",
      getChannels: async () => {
        const { data: channels, error } = (await supabase
          .from("channels")
          .select("*")) as { data: Channel[]; error: any }

        if (error) console.error(error)
        if (channels) set({ channels })
      },
      setCurrentChannelId: (currentChannelId: number | null) =>
        set({ currentChannelId }),
      setCurrentChannelName: (currentChannelName: string) =>
        set({ currentChannelName }),
    }),
    { name: "channelsStorage" }
  )
)

export default useChannelsStore
