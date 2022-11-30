import create from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "../supabaseClient"

export type Message = {
  id: string
  content: string
  channel_id: number | null
  conversation_id: number | null
  is_read: boolean
  charmer_id: string
  created_at: Date
}

type MessagesStore = {
  messages: Message[]
  selectedChannelId: number | null
  selectedConversationId: number | null
  selectChannel: (id: number | null) => void
  selectConversation: (id: number | null) => void
}

const useChannelsStore = create<MessagesStore>()(
  persist(
    (set) => ({
      messages: [],
      selectedChannelId: null,
      selectedConversationId: null,
      selectChannel: async (id: number | null) => {
        set({ selectedChannelId: id, selectedConversationId: null })

        const { data: messages, error } = await supabase
          .from("messages")
          .select("*")
          .eq("channel_id", id)

        if (error) console.error(error)
        if (messages) set({ messages })
      },
      selectConversation: async (id: number | null) => {
        set({ selectedConversationId: id, selectedChannelId: null })

        const { data: messages, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", id)

        if (error) console.error(error)
        if (messages) set({ messages })
      },
    }),
    { name: "messagesStorage" }
  )
)

export default useChannelsStore
