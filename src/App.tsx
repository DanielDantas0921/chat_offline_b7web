

import { useState } from 'react'
import MessageList from './components/MessageList'
import MessageComposer from './components/MessageComposer'
import type { Message } from './types/message'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [sender, setSender] = useState<Message['sender']>('user')

  function handleSend(content: string) {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        content,
        sender,
      },
    ])
  }

  return (
    <div className="min-h-svh bg-[#d6c1a8]">
      <div className="mx-auto flex h-svh w-full max-w-2xl flex-col">
        <main className="min-h-0 flex-1">
          <MessageList messages={messages} />
        </main>
        <div className="shrink-0 p-4">
          <MessageComposer
            sender={sender}
            onSenderChange={() =>
              setSender((currentSender) =>
                currentSender === 'user' ? 'robot' : 'user',
              )
            }
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  )
}

export default App
