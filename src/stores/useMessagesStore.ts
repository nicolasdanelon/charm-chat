import create from "zustand"

import { supabase } from "../supabaseClient"
import MessageRecord from "../types/message-record.type"
import MessagesResponse from "../types/messages-response.type"

type MessagesStore = {
  messages: MessageRecord[]
  addMessage: (message: MessageRecord) => Promise<void>
  getMessages: (channelId: number) => Promise<void>
}

const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  addMessage: async (message: MessageRecord) => {
    set(({ messages }) => ({ messages: [message, ...messages] }))
  },
  getMessages: async (channelId: number) => {
    set({ messages: [] })

    const { data: messages, error } = (await supabase
      .from("messages")
      .select("*, charmer:charmer_id(name)")
      .order("created_at", { ascending: false })
      .eq("channel_id", channelId)) as MessagesResponse

    if (error) console.error(error)
    if (messages) set({ messages })
  },
}))

export default useMessagesStore
