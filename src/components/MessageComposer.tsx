import { useLayoutEffect, useRef, useState } from 'react'
import type { Message } from '../types/message'

type MessageComposerProps = {
  sender: Message['sender']
  onSenderChange: () => void
  onSend: (content: string) => void
}

function MessageComposer({
  sender,
  onSenderChange,
  onSend,
}: MessageComposerProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isRobot = sender === 'robot'

  useLayoutEffect(() => {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const content = message.trim()

    if (!content) {
      return
    }

    onSend(content)
    setMessage('')
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-end gap-3 rounded-2xl border-2 bg-white p-3 shadow-md transition-colors ${
        isRobot ? 'border-purple-500' : 'border-transparent'
      }`}
    >
      <button
        type="button"
        aria-label={`Alternar remetente. Atual: ${isRobot ? 'robô' : 'usuário'}`}
        aria-pressed={isRobot}
        onClick={onSenderChange}
        className="shrink-0 rounded-full bg-stone-100 px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
      >
        {isRobot ? 'Robô' : 'Você'}
      </button>

      <textarea
        ref={textareaRef}
        aria-label="Mensagem"
        rows={1}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        className="max-h-40 min-h-10 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent py-2 text-stone-900 outline-none placeholder:text-stone-500"
      />

      <button
        type="submit"
        disabled={!message.trim()}
        aria-label="Enviar mensagem"
        className="shrink-0 rounded-full bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Enviar
      </button>
    </form>
  )
}

export default MessageComposer
