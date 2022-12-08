import { useEffect } from "preact/hooks"
import useCharmersStore from "../stores/useCharmersStore"
import useChannelsStore from "../stores/useChannelsStore"
import useUserStore from "../stores/useUserStore"

export default function DirectMessages() {
  const { setCurrentChannelId, setCurrentChannelName } = useChannelsStore()
  const { charmers, getCharmers, setSelectedCharmer, selectedCharmer } =
    useCharmersStore()
  const { user } = useUserStore()

  useEffect(() => {
    ;(async () => {
      await getCharmers()
    })()
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
        const color = `text-${charmer.is_online ? "green" : "white"}`

        let itemClass =
          "flex items-center py-1 px-4 opacity-50 w-full " +
          "cursor-pointer hover:bg-teal-500 hover:opacity-100"

        if (selectedCharmer === charmer.id) {
          itemClass = itemClass + " bg-teal-500 opacity-100"
        }

        if (charmer.id === user!.id) return null

        return (
          <button
            onClick={() => {
              setSelectedCharmer(charmer.id)
              setCurrentChannelId(null)
              setCurrentChannelName(charmer.name)
            }}
            className={itemClass}
            key={charmer.id}
          >
            <svg
              className={`h-2 w-2 stroke-current ${color} mr-2`}
              viewBox="0 0 22 22"
            >
              <circle cx="11" cy="11" r="9" fill="none" stroke-width="3" />
            </svg>
            <span className="text-white capitalize">{charmer.name}</span>
          </button>
        )
      })}
    </div>
  )
}
