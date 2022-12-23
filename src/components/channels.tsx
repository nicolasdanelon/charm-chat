import { PostgrestResponse, RealtimeChannel } from "@supabase/supabase-js"
import { useEffect, useState } from "preact/hooks"

import useChannelsStore from "../stores/useChannelsStore"
import useCharmersStore from "../stores/useCharmersStore"
import useUserStore from "../stores/useUserStore"
import { supabase } from "../supabaseClient"
import ChannelsCharmersRecord from "../types/channel-record.type"
import ChannelInput from "./channel-input"

export default function Channels() {
  const { user } = useUserStore()

  const {
    channels,
    getChannels,
    currentChannelId,
    setCurrentChannelId,
    setCurrentChannelName,
    addChannel,
  } = useChannelsStore()

  const { setSelectedCharmer } = useCharmersStore()

  useEffect(() => {
    ; (async () => {
      await getChannels()
    })()
  }, [])

  const [showAddChannel, setShowAddChannel] = useState<boolean>(false)

  const toggleShowAddChannel = () => {
    setShowAddChannel(!showAddChannel)
  }

  const [subChannel, setSubChannel] = useState<RealtimeChannel>()

  useEffect(() => {
    const c = supabase
      .channel("public:channels_charmers")
      .on<ChannelsCharmersRecord>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "channels_charmers",
          filter: `charmer_id=eq.${user?.id}`,
        },
        async (payload) => {
          const { channel_id, charmer_id } = payload.new
          if (charmer_id === user?.id) {
            const { data: channels, error } = (await supabase
              .from("channels")
              .select("id,name")
              .eq("id", channel_id)) as PostgrestResponse<{
                id: number
                name: string
              }>

            if (error) console.error(error)

            const channel = channels?.[0]
              ? channels[0]
              : { id: 0, name: "Channel" }

            addChannel({ id: channel.id, name: channel.name })
            // TODO: what if I didn't create it ??
            setSelectedCharmer(null)
            setCurrentChannelName(`# ${channel.name}`)
            setCurrentChannelId(channel.id)
          }
        }
      )
      .subscribe()

    setSubChannel(c)

    return async () => {
      if (subChannel) {
        await supabase.removeChannel(subChannel)
      }
    }
  }, [user])

  return (
    <div className="mb-8">
      <div className="px-4 mb-2 text-white flex justify-between items-center">
        <div className="opacity-75 cursor-default">Channels</div>
        <button onClick={toggleShowAddChannel}>
          <svg
            className={`fill-current h-4 w-4 opacity-50 cursor-pointer transition-[rotate_0.5s_ease-in-out] ${showAddChannel ? " rotate-45" : ""
              }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
        </button>
      </div>
      {channels.map(({ id, name }) => (
        <div
          key={id}
          className={`bg-${currentChannelId === Number(id) ? "teal-dark" : "none"
            } py-1 px-4 text-white cursor-pointer`}
        >
          <button
            onClick={() => {
              setSelectedCharmer(null)
              setCurrentChannelId(Number(id))
              setCurrentChannelName(`# ${name}`)
            }}
          >
            # {name}
          </button>
        </div>
      ))}
      {showAddChannel && (
        <ChannelInput
          isVisible={showAddChannel}
          setIsVisible={setShowAddChannel}
        />
      )}
    </div>
  )
}
