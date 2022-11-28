import Message from "./message"
import data from "../../chats"

function Messages() {
  return (
    <div className="px-6 py-4 flex-1 overflow-y-scroll">
      {data.map((item) => (
        <Message
          avatar={item.avatar}
          message={item.message}
          name={item.name}
          time={item.time}
          key={item.id}
        />
      ))}
    </div>
  )
}

export default Messages
