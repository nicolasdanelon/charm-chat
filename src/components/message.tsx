import { Md5 } from "ts-md5"
import { useMemo } from "preact/compat"

type MessageProps = {
  name: string
  content: string
  time: Date
}

function returnAvatar(name: string): string {
  return `https://www.gravatar.com/avatar/${Md5.hashStr(name)}?d=retro&f=y`
}

function Message({ name, content, time }: MessageProps) {
  const avatar = useMemo(() => returnAvatar(name), [name])

  return (
    <div className="flex items-start mb-4 text-sm">
      <img src={avatar} className="w-10 h-10 rounded mr-3" />
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
