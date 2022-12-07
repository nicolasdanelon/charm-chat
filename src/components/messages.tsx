import { PostgrestResponse, RealtimeChannel } from "@supabase/supabase-js"
import { useEffect, useState } from "preact/hooks"

import useChannelsStore from "../stores/useChannelsStore"
import useMessagesStore from "../stores/useMessagesStore"
import { supabase } from "../supabaseClient"
import MessageRecord from "../types/message-record.type"

import Message from "./message"

function Messages() {
  const [channel, setChannel] = useState<RealtimeChannel>()

  const { currentChannelId } = useChannelsStore()
  const { messages, getMessages, addMessage, contentFilter } =
    useMessagesStore()

  useEffect(() => {
    if (currentChannelId) getMessages(currentChannelId)
  }, [currentChannelId, contentFilter])

  useEffect(() => {
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

          addMessage({
            ...(payload.new as MessageRecord),
            charmer: charmers!.pop()!,
          })
        }
      )
      .subscribe()

    setChannel(c)

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [currentChannelId])

  return (
    <div className="flex flex-col-reverse px-6 py-4 flex-1 overflow-y-scroll">
      {messages?.map((message) => (
        <Message
          content={message.content}
          name={message.charmer.name}
          time={new Date(message.created_at)}
          key={message.id}
        />
      ))}
    </div>
  )
}

export default Messages
