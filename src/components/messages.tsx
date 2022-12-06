import { PostgrestResponse, RealtimeChannel } from "@supabase/supabase-js"
import { useEffect, useState } from "preact/hooks"
import useChannelsStore from "../stores/useChannelsStore"

import { supabase } from "../supabaseClient"

import Message from "./message"

type MessageRecord = {
  id: number
  channel_id?: number | null
  charmer_id: string
  content: string
  conversation_id?: number | null
  created_at: string
  is_read: boolean
  charmers: { name: string }
}

function Messages() {
  const [messages, setMessages] = useState<MessageRecord[]>([])
  const [channel, setChannel] = useState<RealtimeChannel>()

  const { currentChannelId } = useChannelsStore()

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          *,
          charmers (
            name
          )
        `
        )
        .order("created_at")
        .eq("channel_id", currentChannelId)

      if (error) console.error(error)
      if (data) setMessages(data)
    })()
  }, [currentChannelId])

  useEffect(() => {
    ;(async () => {
      const c = supabase
        .channel(`public:messages:channel_id=eq.${currentChannelId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `channel_id=eq.${currentChannelId}`,
          },
          async (payload) => {
            const { data: charmers, error } = (await supabase
              .from("charmers")
              .select("name")
              .eq("id", payload.new.charmer_id)) as PostgrestResponse<{
              name: string
            }>

            if (error) console.error(error)

            const newMessage: MessageRecord = {
              ...(payload.new as MessageRecord),
              charmers: charmers!.pop()!,
            }

            setMessages((messages) => [...messages, newMessage])
          }
        )
        .subscribe()

      setChannel(c)
    })()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [currentChannelId])

  return (
    <div className="px-6 py-4 flex-1 overflow-y-scroll">
      {messages?.map((message) => (
        <Message
          content={message.content}
          name={message.charmers.name}
          time={new Date(message.created_at)}
          key={message.id}
        />
      ))}
    </div>
  )
}

export default Messages
