'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import ChatArea from '../../components/ChatArea'
import InputArea from '../../components/InputArea'
import Header from '../../components/Header'
import { chatCompletion } from '../../actions/chat'

type Role = 'system' | 'user' | 'assistant'

interface Message {
  role: Role
  content: string
  fileUrl?: string
  fileType?: string
}

const initialMessages: Message[] = [
  { role: 'system', content: 'Eres un asistente virtual llamado MerlyIA, diseñado para ayudar con preguntas sobre inteligencia artificial y tecnología.' },
  { role: 'assistant', content: '¡Hola! Soy MerlyIA, tu asistente virtual. ¿En qué puedo ayudarte hoy?' },
]

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const addMessage = async (newMessage: Message, file?: File) => {
    setMessages((prevMessages) => [...prevMessages, newMessage])
    setIsTyping(true)
    
    try {
      let aiResponse: Message;
      if (file) {
        // Simular el almacenamiento del archivo y generar una URL
        const fileUrl = URL.createObjectURL(file)
        const fileType = file.type
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, fileUrl, fileType }
        ])
        aiResponse = { 
          role: 'assistant', 
          content: `He recibido tu archivo: ${file.name}. ¿En qué puedo ayudarte con este archivo?`
        }
      } else {
        const response = await chatCompletion([...messages, newMessage])
        aiResponse = response
      }
      setMessages((prevMessages) => [...prevMessages, aiResponse])
    } catch (error) {
      console.error('Error getting AI response:', error)
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.' }])
    } finally {
      setIsTyping(false)
    }
  }

  if (status === 'loading') {
    return <div>Cargando...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <ChatArea messages={messages.filter(m => m.role !== 'system')} isTyping={isTyping} />
        <InputArea onSendMessage={(content) => addMessage({ role: 'user', content })} isTyping={isTyping} />
      </div>
    </div>
  )
}