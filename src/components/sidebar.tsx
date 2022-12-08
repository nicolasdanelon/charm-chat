import { h } from "preact"

import Channels from "./channels"
import DirectMessages from "./direct-messages"
import useUserStore from "../stores/useUserStore"

function Sidebar() {
  const { user } = useUserStore()
  const userName = user!.name

  return (
    <>
      <div className="bg-indigo-darkest text-purple-lighter flex-none p-4 hidden md:block">
        <div className="cursor-pointer mb-4">
          <div className="bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
            <img src="https://twitter.com/tailwindcss/profile_image" alt="" />
          </div>
          <div className="text-center text-white opacity-50 text-sm">
            &#8984;1
          </div>
        </div>
        <div className="cursor-pointer mb-4">
          <div className="bg-indigo-lighter opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
            L
          </div>
          <div className="text-center text-white opacity-50 text-sm">
            &#8984;2
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="bg-white opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
            <svg
              className="fill-current h-10 w-10 block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" />
            </svg>
          </div>
        </div>
      </div>
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
            <svg
              className="h-6 w-6 fill-current text-white opacity-25 cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path
                d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <Channels />
        <DirectMessages />
      </div>
    </>
  )
}

export default Sidebar
