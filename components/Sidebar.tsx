import { PlusCircle, User, MessageCircle, Mail, HardDrive, ChevronDown } from 'lucide-react'

const chatList = [
  { 
    id: 1, 
    name: "María García", 
    lastMessage: "¿Podemos revisar el informe mañana?",
    unreadCount: 2,
    timestamp: "10:30"
  },
  { 
    id: 2, 
    name: "Carlos Rodríguez", 
    lastMessage: "Gracias por la información.",
    unreadCount: 0,
    timestamp: "Ayer"
  },
  { 
    id: 3, 
    name: "Ana Martínez", 
    lastMessage: "¿Cuándo es la próxima reunión?",
    unreadCount: 1,
    timestamp: "Lun"
  },
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col h-full">
      <button 
        className="w-full mb-6 py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg rounded-md flex items-center justify-center"
      >
        <PlusCircle className="mr-2 h-5 w-5" /> 
        Nueva Conversación
      </button>
      <div className="space-y-2 flex-grow overflow-y-auto">
        {chatList.map((chat) => (
          <div key={chat.id} className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200">
            <div className="relative mr-3">
              <User className="h-10 w-10 text-gray-300 bg-gray-600 rounded-full p-2" />
              {chat.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium truncate">{chat.name}</span>
                <span className="text-xs text-gray-400">{chat.timestamp}</span>
              </div>
              <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
            <span className="text-white text-lg font-semibold">U</span>
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium">Usuario Ejemplo</h3>
            <p className="text-xs text-gray-400">usuario@ejemplo.com</p>
          </div>
          <button className="ml-auto p-1 rounded-full hover:bg-gray-700">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-green-500 hover:text-green-400 hover:bg-gray-700 p-2 rounded-md">
            <MessageCircle className="h-5 w-5 mb-1" />
            <span className="text-xs">WhatsApp</span>
          </button>
          <button className="flex flex-col items-center text-red-500 hover:text-red-400 hover:bg-gray-700 p-2 rounded-md">
            <Mail className="h-5 w-5 mb-1" />
            <span className="text-xs">Gmail</span>
          </button>
          <button className="flex flex-col items-center text-blue-500 hover:text-blue-400 hover:bg-gray-700 p-2 rounded-md">
            <HardDrive className="h-5 w-5 mb-1" />
            <span className="text-xs">Drive</span>
          </button>
        </div>
      </div>
    </div>
  )
}

