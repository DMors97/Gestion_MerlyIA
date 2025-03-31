'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar usuario')
      }

      router.push('/login?registered=true')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al registrar usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="MerlyIA Logo"
              width={150}
              height={40}
              className="mx-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-8">Crear Cuenta</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </Link>
          </p>

          <div className="mt-8 text-center text-xs text-gray-500">
            <Link href="/terms" className="hover:text-gray-700">Términos de Servicio</Link>
            {' · '}
            <Link href="/privacy" className="hover:text-gray-700">Política de Privacidad</Link>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block lg:w-1/2 bg-[#1a1040] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Stars */}
            <div className="absolute inset-0">
              <div className="stars"></div>
            </div>
            
            {/* Mountains */}
            <div className="absolute bottom-0 w-full">
              <svg viewBox="0 0 1440 320" className="fill-[#ff6b6b]">
                <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>

            {/* Rocket */}
            <div className="absolute left-1/2 bottom-1/4 transform -translate-x-1/2 rocket-animation">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                <path d="M12 2L12 22M12 2L8 6M12 2L16 6M12 22L8 18M12 22L16 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stars {
          background: #000 url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
          z-index: 0;
          height: 100%;
          animation: move-twinkle-back 200s linear infinite;
        }

        @keyframes move-twinkle-back {
          from {background-position: 0 0;}
          to {background-position: -10000px 5000px;}
        }

        .rocket-animation {
          animation: rocket-float 3s ease-in-out infinite;
        }

        @keyframes rocket-float {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-20px) translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

