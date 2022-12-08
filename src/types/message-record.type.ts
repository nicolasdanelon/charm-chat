type MessageRecord = {
  id: number
  channel_id?: number | null
  charmer_id: string
  content: string
  conversation_id?: number | null
  created_at: string
  is_read: boolean
  charmer?: { name: string }
  name?: string
}

export default MessageRecord
