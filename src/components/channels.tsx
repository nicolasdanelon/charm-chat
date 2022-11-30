import { h } from "preact"
import { useEffect, useState } from "preact/hooks"

import { supabase } from "../supabaseClient"

type Channel = {
  id: string
  name: string
}

export default function Channels() {
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase.from("channels").select("*")

      if (error) console.error(error)

      if (data) setChannels(data)
    })()
  }, [])

  return (
    <div className="mb-8">
      <div className="px-4 mb-2 text-white flex justify-between items-center">
        <div className="opacity-75">Channels</div>
        <div>
          <svg
            className="fill-current h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
        </div>
      </div>
      {channels.map(({ id, name }) => (
        <div key={id} className="bg-teal-dark py-1 px-4 text-white">
          # {name}
        </div>
      ))}
    </div>
  )
}
