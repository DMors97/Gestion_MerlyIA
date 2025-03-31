import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  } else {
    redirect("/chat")
  }

  // Este return nunca se ejecutará debido a las redirecciones anteriores,
  // pero es necesario para satisfacer el tipo de retorno de la función
  return null
}

