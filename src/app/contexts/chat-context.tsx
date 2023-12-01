import { ReactNode, createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { IUserDecoded } from '../../types/user'

interface IChatContext {
  socket: Socket | null
  setSocket: (data: Socket | null) => void
  onlineUsers: any
  setOnlineUsers: (data: any) => void
}

interface ChatContextProps {
  children: ReactNode
  user: IUserDecoded
}

export const ChatContext = createContext({} as IChatContext)

export function ChatProvider({ children, user }: ChatContextProps) {
  const [onlineUsers, setOnlineUsers] = useState(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  // useEffect(() => {
  //   const newSocket = io('http://localhost:3001')
  //   setSocket((prevSocket) => {
  //     if (prevSocket !== null) {
  //       prevSocket.disconnect()
  //     }
  //     return newSocket
  //   })
  //   return () => {
  //     newSocket.disconnect()
  //   }
  // }, [user])

  // // ...

  // useEffect(() => {
  //   if (socket === null) return

  //   const handleConnect = () => {
  //     console.log('Estado da conexão do socket:', socket.connected)
  //     socket.emit('addNewUser', user?.id)
  //     console.log('Estado da conexão do socket:', socket.connected)
  //     socket.on('getUsers', (res) => {
  //       setOnlineUsers(res)
  //     })
  //   }

  //   // Adiciona um ouvinte para o evento 'connect'
  //   socket.on('connect', handleConnect)

  //   // Remove o ouvinte quando o componente é desmontado
  //   return () => {
  //     socket.disconnect()
  //     socket.off('connect', handleConnect)
  //   }
  // }, [socket, user])

  return (
    <ChatContext.Provider
      value={{ onlineUsers, setOnlineUsers, socket, setSocket }}
    >
      {children}
    </ChatContext.Provider>
  )
}
