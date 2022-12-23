import { h } from "preact"

import Channels from "./channels"
import DirectMessages from "./direct-messages"
import useUserStore from "../stores/useUserStore"

function Sidebar() {
  const { user } = useUserStore()
  const userName = user!.name

  return (
    <div className="bg-indigo-darker text-purple-lighter flex-none w-64 pb-6 hidden md:block">
      <div className="text-white mb-2 mt-3 px-4 flex justify-between">
        <div className="flex-auto">
          <h1 className="font-semibold text-xl leading-tight mb-1 truncate cursor-default">
            Charm chat
          </h1>
          <div className="flex items-center mb-6">
            <svg
              className="h-2 w-2 fill-current text-green mr-2"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="10" />
            </svg>
            <span className="text-white opacity-50 text-sm capitalize cursor-default">
              {userName}
            </span>
          </div>
        </div>
        <div>
          <a title="Log out" href="/logout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-6 w-6 fill-current text-white opacity-25 cursor-pointer hover:opacity-100"
            >
              <path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
            </svg>
          </a>
        </div>
      </div>
      <Channels />
      <DirectMessages />
    </div>
  )
}

export default Sidebar
