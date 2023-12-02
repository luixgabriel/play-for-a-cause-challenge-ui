import { ReactNode, createContext, useEffect, useState } from 'react'
import { IUserDecoded } from '../../types/user'

interface IAuthContext {
  user: IUserDecoded | null
  setUser: (data: IUserDecoded) => void
}

interface AuthContextProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<IUserDecoded | null>(null)

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user')

    if (userLocalStorage) {
      setUser(JSON.parse(userLocalStorage))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
