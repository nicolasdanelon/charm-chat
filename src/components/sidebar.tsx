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
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-6 w-6 fill-current text-white opacity-25 cursor-pointer"
            >
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
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
