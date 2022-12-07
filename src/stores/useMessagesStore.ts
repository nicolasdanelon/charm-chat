import create from "zustand"

import { supabase } from "../supabaseClient"
import MessageRecord from "../types/message-record.type"
import MessagesResponse from "../types/messages-response.type"

type GetMessagesArgs = {
  conversationId?: number
  channelId?: number
}

type MessagesStore = {
  messages: MessageRecord[]
  contentFilter: string
  setContentFilter: (contentFilter: string) => void
  addMessage: (message: MessageRecord) => void
  getMessages: (args: GetMessagesArgs) => Promise<void>
}

async function queryMessages(field: string, value: number, filter?: string) {
  const { data: messages, error } = (await supabase
    .from("messages")
    .select("*, charmer:charmer_id(name)")
    .order("created_at", { ascending: false })
    .like("content", `%${filter ?? "*"}%`)
    .eq(field, value)) as MessagesResponse

  return { messages, error }
}

const useMessagesStore = create<MessagesStore>((set, get) => ({
  messages: [],
  contentFilter: "*",
  addMessage: async (message: MessageRecord) => {
    set(({ messages }) => ({ messages: [message, ...messages] }))
  },
  setContentFilter: (contentFilter: string) => {
    set({ contentFilter })
  },
  getMessages: async (args: GetMessagesArgs) => {
    const { conversationId, channelId } = args
    set({ messages: [] })

    if (conversationId) {
      const { messages, error } = await queryMessages(
        "conversation_id",
        conversationId,
        get().contentFilter
      )

      if (error) console.error(error)
      if (messages) set({ messages })
    } else if (channelId) {
      const { messages, error } = await queryMessages(
        "channel_id",
        channelId,
        get().contentFilter
      )

      if (error) console.error(error)
      if (messages) set({ messages })
    }
  },
}))

export default useMessagesStore
