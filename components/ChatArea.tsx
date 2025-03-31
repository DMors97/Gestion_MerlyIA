import { User } from 'lucide-react'
import Image from 'next/image'

interface Message {
  role: string
  content: string
  fileUrl?: string
  fileType?: string
}

interface ChatAreaProps {
  messages: Message[]
  isTyping: boolean
}

export default function ChatArea({ messages, isTyping }: ChatAreaProps) {
  const renderFileContent = (message: Message) => {
    if (message.fileUrl) {
      if (message.fileType?.startsWith('audio')) {
        return (
          <audio controls src={message.fileUrl} className="mt-2 max-w-full">
            Your browser does not support the audio element.
          </audio>
        )
      } else {
        return (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 block"
          >
            Ver archivo adjunto
          </a>
        )
      }
    }
    return null
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {Array.isArray(messages) && messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className="flex-shrink-0 w-11 h-11">
              {message.role === 'user' ? (
                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perfil%20de%20asistente-BgaeTPLf3a4a2t2260q67D3ZaMDEnR.png"
                    alt="MerlyIA Assistant"
                    width={44}
                    height={44}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className={`flex flex-col gap-1 max-w-[75%]`}>
              <div
                className={`relative flex flex-col gap-1 ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`px-6 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-base">{typeof message.content === 'string' ? message.content : ''}</p>
                  {renderFileContent(message)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perfil%20de%20asistente-BgaeTPLf3a4a2t2260q67D3ZaMDEnR.png"
                alt="MerlyIA Assistant"
                width={44}
                height={44}
                className="object-cover"
              />
            </div>
            <div className="px-6 py-3 rounded-2xl bg-gray-200 text-gray-900 rounded-bl-none">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

