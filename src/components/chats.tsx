import ChatTopBar from "./chat-top-bar"
import Messages from "./messages"
import MessageComposer from "./message-composer"
import useUserStore from "../stores/useUserStore"

function Chats() {
  const { user } = useUserStore()

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <ChatTopBar />
      <Messages />
      <MessageComposer charmerId={user!.id} />
    </div>
  )
}

export default Chats
