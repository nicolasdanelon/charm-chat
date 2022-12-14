import {
  PostgrestResponse,
  RealtimeChannel,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js"
import { useEffect, useState } from "preact/hooks"
import Lottie from "lottie-react"

import useChannelsStore from "../stores/useChannelsStore"
import useMessagesStore from "../stores/useMessagesStore"
import { supabase } from "../supabaseClient"
import MessageRecord from "../types/message-record.type"

import Message from "./message"
import useCharmersStore from "../stores/useCharmersStore"
import useUserStore from "../stores/useUserStore"
import loadingAnimation from "../assets/loading-animation.json"
import nothingAnimation from "../assets/nothing-animation.json"

function Messages() {
  const [channel, setChannel] = useState<RealtimeChannel>()
  const [loading, setLoading] = useState<boolean>(true)

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
    ;(async () => {
      if (selectedCharmer) {
        setLoading(true)
        await getConversationMessages(user!.id, selectedCharmer)
        setLoading(false)
      }
    })()
  }, [selectedCharmer, contentFilter])

  useEffect(() => {
    ;(async () => {
      if (currentChannelId) {
        setLoading(true)
        await getChannelMessages(currentChannelId)
        setLoading(false)
      }
    })()
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

        setLoading(false)

        addMessage({ ...payload.new, charmer })
      })
      .subscribe()

    setChannel(c)

    return async () => {
      if (channel) {
        setLoading(false)
        await supabase.removeChannel(channel)
      }
    }
  }, [currentChannelId, conversationId])

  if (loading && messages.length === 0) {
    return (
      <div className="flex flex-col px-6 py-4 flex-1">
        <div className="grid place-items-center">
          <Lottie
            loop={true}
            autoplay={true}
            animationData={loadingAnimation}
          />
          <em>loading...</em>
        </div>
      </div>
    )
  }

  if (!loading && messages.length === 0) {
    return (
      <div className="flex px-6 py-4 flex-1 items-center justify-center h-screen">
        <div className="w-500 h-500 text-center">
          <Lottie
            loop={true}
            autoplay={true}
            style={{ height: 500, width: 500 }}
            animationData={nothingAnimation}
          />
          <em>no messages...</em>
        </div>
      </div>
    )
  }

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
