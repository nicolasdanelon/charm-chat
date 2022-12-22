import { StateUpdater, useEffect, useRef, useState } from "preact/hooks"
import { supabase } from "../supabaseClient"

type ChannelInputProps = {
  isVisible: boolean
  setIsVisible: StateUpdater<boolean>
}

function ChannelInput({ isVisible, setIsVisible }: ChannelInputProps) {
  const addChannelInput = useRef<HTMLInputElement>(null)

  const [newChannelName, setNewChannelName] =
    useState<string>("new channel name")

  const createChannel = async () => {
    let { data, error } = await supabase.rpc("add_channel", {
      name: newChannelName,
    })
  }

  const handleKeyPress = async (event: { key: string }) => {
    if (event.key === "Enter" && newChannelName.trim().length) {
      await createChannel()

      setNewChannelName("")
      setIsVisible(false)
    }
  }

  useEffect(() => {
    if (isVisible) {
      addChannelInput.current?.focus()
      addChannelInput.current?.select()
    }
  }, [isVisible])

  return (
    <div className="bg-none py-1 px-4 text-white cursor-pointer flex">
      #
      <input
        type="text"
        className="bg-transparent border-solid flex-1 ml-1 outline-none"
        autofocus={true}
        ref={addChannelInput}
        value={newChannelName}
        onChange={(e) => setNewChannelName(e.currentTarget.value)}
        onKeyPressCapture={handleKeyPress}
      />
    </div>
  )
}

export default ChannelInput
