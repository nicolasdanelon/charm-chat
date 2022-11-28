type MessageProps = {
  avatar: string
  name: string
  message: string
  time: string
}

function Message({ avatar, name, message, time }: MessageProps) {
  return (
    <div className="flex items-start mb-4 text-sm">
      <img src={avatar} className="w-10 h-10 rounded mr-3" />
      <div className="flex-1 overflow-hidden">
        <div>
          <span className="font-bold">{name}</span>{" "}
          <span className="text-grey text-xs">{time}</span>
        </div>
        <p className="text-black leading-normal">{message}</p>
      </div>
    </div>
  )
}

export default Message
