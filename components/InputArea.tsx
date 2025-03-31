import { useState, useRef } from 'react'
import { Send, Paperclip, Mic } from 'lucide-react'

interface InputAreaProps {
  onSendMessage: (content: string, file?: File) => void
  isTyping: boolean
}

export default function InputArea({ onSendMessage, isTyping }: InputAreaProps) {
  const [input, setInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isTyping) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onSendMessage(`Archivo adjunto: ${file.name}`, file)
    }
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onSendMessage(`Audio adjunto: ${file.name}`, file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white">
      <div className="flex items-center space-x-2">
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-blue-500"
        >
          <Paperclip className="h-5 w-5" />
          <span className="sr-only">Adjuntar archivo</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <button 
          type="button" 
          onClick={() => audioInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-blue-500"
        >
          <Mic className="h-5 w-5" />
          <span className="sr-only">Adjuntar audio</span>
        </button>
        <input
          type="file"
          ref={audioInputRef}
          onChange={handleAudioUpload}
          accept="audio/*"
          className="hidden"
        />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="flex-1 p-2 border rounded-md resize-none"
          disabled={isTyping}
        />
        <button 
          type="submit" 
          disabled={isTyping}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviar mensaje</span>
        </button>
      </div>
    </form>
  )
}

