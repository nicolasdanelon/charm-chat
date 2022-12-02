import { PostgrestResponse, RealtimeChannel } from "@supabase/supabase-js"
import { useEffect, useState } from "preact/hooks"

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

type MessagesProps = {
  channelId: number
}

function Messages({ channelId }: MessagesProps) {
  const [messages, setMessages] = useState<MessageRecord[]>([])
  const [channel, setChannel] = useState<RealtimeChannel>()

  useEffect(() => {
    ;(async () => {
      const { data: messages, error } = await supabase
        .from("messages")
        .select(
          `
          *,
          charmers (
            name
          )
        `
        )
        .eq("channel_id", channelId)

      if (error) console.error(error)
      if (messages) setMessages(messages)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const c = supabase
        .channel(`public:messages:channel_id=eq.${channelId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `channel_id=eq.${channelId}`,
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

            setMessages([...messages, newMessage])
          }
        )
        .subscribe()

      setChannel(c)
    })()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [channelId])

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <div className="px-6 py-4 flex-1 overflow-y-scroll">
      {messages.map((message) => (
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
