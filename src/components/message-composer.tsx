import { useState } from "preact/hooks"

import { supabase } from "../supabaseClient"
import useChannelsStore from "../stores/useChannelsStore"
import useMessagesStore from "../stores/useMessagesStore"

type MessageComposerType = {
  charmerId: string
}

function MessageComposer({ charmerId }: MessageComposerType) {
  const [content, setContent] = useState<string>("")
  const { currentChannelId } = useChannelsStore()
  const { conversationId } = useMessagesStore()

  const handleChange = (event: any) => {
    setContent(event.currentTarget.value)
  }

  const submitMessage = async () => {
    if (content.match(/^\/.+/g)) {
      const [spell, arg] = content.split(" ")

      if (spell == "/invite" && arg.endsWith("@conjure.co.uk")) {
        let { data, error } = await supabase.rpc("add_charmer_to_channel", {
          channel_id: currentChannelId,
          charmer_email: arg,
        })

        if (error) console.error(error)
        else console.log(data)
      }

      return false
    }

    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      channel_id: currentChannelId,
      charmer_id: charmerId,
      content,
    })

    if (error) console.error(error)
  }

  const handleKeyPress = async (event: { key: string }) => {
    if (event.key === "Enter" && content.trim().length) {
      await submitMessage()

      setContent("")
    }
  }

  return (
    <div className="pb-6 px-4 flex-none">
      <div className="flex rounded-lg border-2 border-grey overflow-hidden">
        <span
          className="text-3xl text-grey border-r-2 border-grey p-2 cursor-pointer"
          onClick={async () => {
            if (content.length > 0) {
              await submitMessage()
              setContent("")
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-current h-5 w-5 block m-1 m-1"
          >
            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
          </svg>
        </span>
        <input
          type="text"
          className="w-full px-4"
          placeholder="Message #general"
          value={content}
          onChange={handleChange}
          onKeyPressCapture={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default MessageComposer
