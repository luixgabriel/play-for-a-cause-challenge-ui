import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
interface User {
  id: string
  name: string
  imageUrl: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const user: User = jwtDecode(token)

  return user
}
