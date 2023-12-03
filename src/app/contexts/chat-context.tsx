import {
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'
import { IUserDecoded } from '../../types/user'
import { IOnlineUsers } from '../../types/online-users'
import { useFetchUserChats } from '../hooks/useGetUserChats'
import { IUserChats } from '../../types/user-chats'
import { useQueryClient } from '@tanstack/react-query'

interface IChatContext {
  socket: Socket | null
  setSocket: (data: Socket | null) => void
  onlineUsers: IOnlineUsers[] | null
  setOnlineUsers: (data: any) => void
  userChats: IUserChats[] | null
  isLoading: boolean
  messageList: string[]
  setMessageList: (value: SetStateAction<string[]>) => void
}

interface ChatContextProps {
  children: ReactNode
  user: IUserDecoded
}

export const ChatContext = createContext({} as IChatContext)

export function ChatProvider({ children, user }: ChatContextProps) {
  const queryClient = useQueryClient()
  const [onlineUsers, setOnlineUsers] = useState<any>(null)
  const [messageList, setMessageList] = useState<string[]>([])
  const [userChats, setUserChats] = useState<IUserChats[] | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)
  const { data, isLoading } = useFetchUserChats()

  useEffect(() => {
    const removeUserOwner = data?.map((item: IUserChats) => ({
      ...item,
      participants: item.participants.filter(
        (participants) => participants.id !== user.id,
      ),
    }))

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
    socket.on('connect', handleConnect)
    return () => {
      socket.disconnect()
      socket.off('sendMessage', handleConnect)
    }
  }, [])

  useEffect(() => {
    if (socket === null) return
    socket.on('sendMessage', (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user-chats'],
      })
      setMessageList((prev: any) => [...prev, data.content])
    })

    return () => {
      socket.disconnect()
      socket.off('sendMessage')
    }
  }, [socket])

  return (
    <ChatContext.Provider
      value={{
        onlineUsers,
        setOnlineUsers,
        socket,
        setSocket,
        userChats,
        isLoading,
        messageList,
        setMessageList,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
