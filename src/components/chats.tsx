import ChatTopBar from "./chat-top-bar"
import Messages from "./messages"
import MessageComposer from "./message-composer"

function Chats() {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <ChatTopBar />
      <Messages />
      <MessageComposer />
    </div>
  )
}

export default Chats
