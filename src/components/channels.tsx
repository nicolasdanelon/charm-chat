import { h } from "preact"
import { useEffect } from "preact/hooks"

import useChannelsStore from "../stores/useChannelsStore"

export default function Channels() {
  const { channels, getChannels } = useChannelsStore()

  useEffect(() => {
    getChannels()
  }, [])

  return (
    <div className="mb-8">
      <div className="px-4 mb-2 text-white flex justify-between items-center">
        <div className="opacity-75 cursor-default">Channels</div>
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
      {channels.map(({ id, name }) => (
        <div
          key={id}
          className="bg-teal-dark py-1 px-4 text-white cursor-pointer"
        >
          # {name}
        </div>
      ))}
    </div>
  )
}
