import { useEffect, useRef } from 'react'
import type { Message } from '../types/message'
import MessageBubble from './MessageBubble'

type MessageListProps = {
  messages: Message[]
}

function MessageList({ messages }: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current

    if (list) {
      list.scrollTop = list.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={listRef}
      role="log"
      aria-label="Histórico de mensagens"
      aria-live="polite"
      className="h-full overflow-y-auto px-4 py-6"
    >
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}

export default MessageList
