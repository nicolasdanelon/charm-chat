import {
  PostgrestResponse,
  RealtimeChannel,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js"
import { useEffect, useState } from "preact/hooks"

import useChannelsStore from "../stores/useChannelsStore"
import useMessagesStore from "../stores/useMessagesStore"
import { supabase } from "../supabaseClient"
import MessageRecord from "../types/message-record.type"

import Message from "./message"
import useCharmersStore from "../stores/useCharmersStore"

function Messages() {
  const [channel, setChannel] = useState<RealtimeChannel>()

  const { currentChannelId } = useChannelsStore()
  const { messages, getMessages, addMessage, contentFilter } =
    useMessagesStore()

  const { selectedCharmer } = useCharmersStore()

  useEffect(() => {
    if (currentChannelId) getMessages({ channelId: currentChannelId })
  }, [currentChannelId, contentFilter])

  let channelName: string
  let channelFilter: RealtimePostgresChangesFilter<"INSERT">

  if (selectedCharmer) {
    channelName = `public:messages:conversation_id=eq.${selectedCharmer}`
    channelFilter = {
      event: "INSERT",
      schema: "public",
      table: "messages",
      filter: `conversation_id=eq.${selectedCharmer}`,
    }
  } else if (currentChannelId) {
    channelName = `public:messages:channel_id=eq.${currentChannelId}`
    channelFilter = {
      event: "INSERT",
      schema: "public",
      table: "messages",
      filter: `channel_id=eq.${currentChannelId}`,
    }
  }

  useEffect(() => {
    const c = supabase
      .channel(channelName)
      .on<MessageRecord>("postgres_changes", channelFilter, async (payload) => {
        const { charmer_id } = payload.new
        const { data: charmers, error } = (await supabase
          .from("charmers")
          .select("name")
          .eq("id", charmer_id)) as PostgrestResponse<{
          name: string
        }>

        if (error) console.error(error)

        const charmer = charmers?.[0] ? charmers[0] : { name: "User" }

        addMessage({ ...payload.new, charmer })
      })
      .subscribe()

    setChannel(c)

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [currentChannelId, selectedCharmer])

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
