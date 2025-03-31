'use client'

import { signOut } from 'next-auth/react'
import { Bot, LogOut } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perfil%20de%20asistente-BgaeTPLf3a4a2t2260q67D3ZaMDEnR.png"
            alt="MerlyIA Assistant"
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">MerlyIA</h1>
          <p className="text-sm text-green-500">En línea</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
      >
        <LogOut className="h-5 w-5" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  )
}

