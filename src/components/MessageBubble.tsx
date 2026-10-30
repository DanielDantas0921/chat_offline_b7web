import type { Message } from '../types/message'

type MessageBubbleProps = {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <article
        className={`max-w-[85%] break-words rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${
          isUser
            ? 'rounded-br-sm bg-amber-900 text-white'
            : 'rounded-bl-sm bg-white text-stone-900'
        }`}
      >
        <p className="mb-1 text-xs font-semibold opacity-70">
          {isUser ? 'Você' : 'Robô'}
        </p>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </article>
    </div>
  )
}

export default MessageBubble
