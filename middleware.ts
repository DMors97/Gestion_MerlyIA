import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Si el usuario está autenticado y trata de acceder a /login o /register, redirigir a /chat
    if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/chat", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Si el usuario no está autenticado y no está tratando de acceder a /login o /register, redirigir a /login
        if (!token && !["/login", "/register"].includes(req.nextUrl.pathname)) {
          return false
        }
        return true
      },
    },
  }
)

export const config = { matcher: ["/chat", "/login", "/register"] }

