import { RealtimeChannel } from "@supabase/supabase-js"
import { useEffect, useState } from "preact/hooks"

import useCharmersStore from "../stores/useCharmersStore"
import useChannelsStore from "../stores/useChannelsStore"
import useUserStore from "../stores/useUserStore"
import { supabase } from "../supabaseClient"
import CharmerRecord from "../types/charmer-record.type"

export default function DirectMessages() {
  const { setCurrentChannelId, setCurrentChannelName } = useChannelsStore()
  const {
    charmers,
    getCharmers,
    setSelectedCharmer,
    selectedCharmer,
    setCharmerOnlineStatus,
  } = useCharmersStore()
  const { user } = useUserStore()
  const [channel, setChannel] = useState<RealtimeChannel>()

  useEffect(() => {
    ;(async () => {
      await getCharmers()
    })()

    const c = supabase
      .channel("public:charmers")
      .on<CharmerRecord>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "charmers",
        },
        async (payload) => {
          const { id, is_online } = payload.new
          setCharmerOnlineStatus(id, is_online)
        }
      )
      .subscribe()

    setChannel(c)

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="mb-8">
      <div className="px-4 mb-2 text-white flex justify-between items-center">
        <div className="opacity-75 cursor-default">Direct Messages</div>
        <div>
          <svg
            className="fill-current h-4 w-4 opacity-50 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center mb-1 px-4 cursor-default">
        <svg
          className="h-2 w-2 fill-current text-green mr-2"
          viewBox="0 0 20 20"
        >
          <circle cx="10" cy="10" r="10" />
        </svg>
        <span className="text-white opacity-75 capitalize">
          {user!.name} <span className="text-grey text-sm">(you)</span>
        </span>
      </div>

      {charmers.map((charmer) => {
        const active = charmer.is_online
          ? "text-green fill-current"
          : "text-white stroke-current"

        if (charmer.id === user!.id) return null

        return (
          <button
            onClick={() => {
              setSelectedCharmer(charmer.id)
              setCurrentChannelId(null)
              setCurrentChannelName(charmer.name)
            }}
            className={`
              flex items-center py-1 px-4 w-full
              cursor-pointer
              ${selectedCharmer === charmer.id && "bg-teal-500"}
            `}
            key={charmer.id}
          >
            <svg className={`h-2 w-2 ${active} mr-2`} viewBox="-2 -2 23 23">
              <circle
                cx="10"
                cy="10"
                r="10"
                fill={`${charmer.is_online ? "" : "none"}`}
                stroke-width="3"
              />
            </svg>
            <span className="text-white capitalize opacity-50 hover:opacity-100">
              {charmer.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
