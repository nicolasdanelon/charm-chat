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
import useUserStore from "../stores/useUserStore"

function Messages() {
  const [channel, setChannel] = useState<RealtimeChannel>()

  const { user } = useUserStore()
  const { currentChannelId } = useChannelsStore()
  const {
    messages,
    getChannelMessages,
    getConversationMessages,
    addMessage,
    contentFilter,
    conversationId,
  } = useMessagesStore()
  const { selectedCharmer } = useCharmersStore()

  useEffect(() => {
    if (selectedCharmer) getConversationMessages(user!.id, selectedCharmer)
  }, [selectedCharmer])

  useEffect(() => {
    if (currentChannelId) getChannelMessages(currentChannelId)
  }, [currentChannelId, contentFilter])

  let channelName: string
  let channelFilter: RealtimePostgresChangesFilter<"INSERT">

  useEffect(() => {
    if (currentChannelId) {
      channelName = `public:messages:channel_id=eq.${currentChannelId}`
      channelFilter = {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `channel_id=eq.${currentChannelId}`,
      }
    } else if (conversationId) {
      channelName = `public:messages:conversation_id=eq.${conversationId}`
      channelFilter = {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      }
    }

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
  }, [currentChannelId, conversationId])

  return (
    <div className="flex flex-col-reverse px-6 py-4 flex-1 overflow-y-scroll">
      {messages?.map((message) => (
        <Message
          content={message.content}
          name={message.charmer?.name ?? message.name ?? "Charmer"}
          time={new Date(message.created_at)}
          key={message.id}
        />
      ))}
    </div>
  )
}

export default Messages
