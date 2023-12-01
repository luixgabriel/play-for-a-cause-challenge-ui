import { ReactNode, createContext, useEffect, useState } from 'react'
import { IUserDecoded } from '../../types/user'

interface IAuthContext {
  user: IUserDecoded | null
  setUser: (data: IUserDecoded) => void
  isAuthenticated: boolean
  setIsAuthenticated: (data: boolean) => void
}

interface AuthContextProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<IUserDecoded | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user')
    if (userLocalStorage) {
      setUser(JSON.parse(userLocalStorage))
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}
