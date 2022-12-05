type MessageProps = {
  name: string
  content: string
  time: Date
}

function Message({ name, content, time }: MessageProps) {
  return (
    <div className="flex items-start mb-4 text-sm">
      <img
        src="https://randomuser.me/api/portraits/men/85.jpg"
        className="w-10 h-10 rounded mr-3"
      />
      <div className="flex-1 overflow-hidden">
        <div>
          <span className="font-bold capitalize">{name}</span>{" "}
          <span className="text-grey text-xs">
            {time.toDateString()} {time.toLocaleTimeString()}
          </span>
        </div>
        <p className="text-black leading-normal">{content}</p>
      </div>
    </div>
  )
}

export default Message
