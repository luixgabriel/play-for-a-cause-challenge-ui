import { ReactNode, createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { IUserDecoded } from '../../types/user'
import { IOnlineUsers } from '../../types/online-users'
import { userChats } from '../../services/requests'
import { useFetchUserChats } from '../hooks/useGetUserChats'
import { IUserChats } from '../../types/user-chats'

interface IChatContext {
  socket: Socket | null
  setSocket: (data: Socket | null) => void
  onlineUsers: any
  setOnlineUsers: (data: any) => void
  userChats: any[] | null
  isLoading: boolean
}

interface ChatContextProps {
  children: ReactNode
  user: IUserDecoded
}

export const ChatContext = createContext({} as IChatContext)

export function ChatProvider({ children, user }: ChatContextProps) {
  const [onlineUsers, setOnlineUsers] = useState(null)
  const [messages, setMessages] = useState<any[] | null>(null)
  const [newMessage, setNewMessage] = useState<any[] | null>(null)
  const [receiverId, setReceiverId] = useState<any | null>(null)
  const [userChats, setUserChats] = useState<any[] | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  const { data, isLoading } = useFetchUserChats()

  useEffect(() => {
    const removeUserOwner = data?.map((item: IUserChats) => ({
      ...item,
      participants: item.participants.filter(
        (participants) => participants.id !== user.id,
      ),
    }))
    console.log(removeUserOwner)
    setUserChats(removeUserOwner)
  }, [data])

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket((prevSocket) => {
      if (prevSocket !== null) {
        prevSocket.disconnect()
      }
      return newSocket
    })
    return () => {
      newSocket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (socket === null) return

    const handleConnect = () => {
      socket.emit('getUsers', user?.id)
      socket.on('getUsers', (res) => {
        if (user) {
          setOnlineUsers(
            res.filter((item: IOnlineUsers) => item.user.id !== user.id),
          )
        }
      })
    }
    socket.on('connect', handleConnect)

    return () => {
      socket.disconnect()
      socket.off('getUsers', handleConnect)
    }
  }, [socket, user])

  useEffect(() => {
    if (socket === null) return

    const handleConnect = () => {
      socket.emit('sendMessage', user?.id)
      socket.on('getUsers', (res) => {
        setOnlineUsers(
          res.filter((item: IOnlineUsers) => item.user.id !== user.id),
        )
      })
    }

    // Adiciona um ouvinte para o evento 'connect'
    socket.on('connect', handleConnect)

    // Remove o ouvinte quando o componente é desmontado
    return () => {
      socket.disconnect()
      socket.off('sendMessage', handleConnect)
    }
  }, [])

  // useEffect(() => {
  //   if (socket === null) return

  //   socket.on('getMessage', (res) => {
  //     if (currentChat?._id !== res.chatId) return

  //     setMessages((prev) => [...prev, res])
  //   })

  //   return () => {
  //     socket.off('getMessage')
  //     socket.off('getNotification')
  //   }
  // }, [socket, currentChat])

  return (
    <ChatContext.Provider
      value={{
        onlineUsers,
        setOnlineUsers,
        socket,
        setSocket,
        userChats,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
