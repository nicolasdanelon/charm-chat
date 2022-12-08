import create from "zustand"

import { supabase } from "../supabaseClient"
import MessageRecord from "../types/message-record.type"
import MessagesResponse from "../types/messages-response.type"

type MessagesStore = {
  messages: MessageRecord[]
  conversationId: number | null
  contentFilter: string
  setContentFilter: (contentFilter: string) => void
  addMessage: (message: MessageRecord) => void
  getChannelMessages: (id: number) => Promise<void>
  getConversationMessages: (userId: string, charmerId: string) => Promise<void>
}

const useMessagesStore = create<MessagesStore>((set, get) => ({
  messages: [],
  contentFilter: "*",
  conversationId: null,
  addMessage: async (message: MessageRecord) => {
    set(({ messages }) => ({ messages: [message, ...messages] }))
  },
  setContentFilter: (contentFilter: string) => {
    set({ contentFilter })
  },
  getChannelMessages: async (id: number) => {
    set({ messages: [] })

    const { data: messages, error } = (await supabase
      .from("messages")
      .select("*, charmer:charmer_id(name)")
      .order("created_at", { ascending: false })
      .like("content", `%${get().contentFilter ?? "*"}%`)
      .eq("channel_id", id)) as MessagesResponse

    if (error) console.error(error)
    if (messages) set({ messages })
  },
  getConversationMessages: async (userId: string, charmerId: string) => {
    set({ messages: [] })

    let { data: messages, error } = (await supabase.rpc(
      "get_conversation_messages",
      { id1: userId, id2: charmerId }
    )) as MessagesResponse

    if (error) console.error(error)
    if (messages)
      set({ messages, conversationId: messages[0]?.conversation_id ?? null })
  },
}))

export default useMessagesStore
