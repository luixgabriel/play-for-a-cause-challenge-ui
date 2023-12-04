'use client'
import Image from 'next/image'
import ChatBox from '../components/chatbox'
import ContainerMain from '../components/container-main'
import { useChat } from '../hooks/useChat'
import Profile from '../components/profile'
import ProfilePicture from '../components/profile-picture'
import { IOnlineUsers } from '../../types/online-users'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { UsersRound, MessageSquare, Frown } from 'lucide-react'
import { IUserChats } from '../../types/user-chats'
import { useCreateChatMutate } from '../hooks/useCreateChatMutate'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import LoadingIcon from '../components/loading-icon'

const ContainerChat = () => {
  const [receiver, setReceiver] = useState<IUserChats | null>(null)
  const { mutate, isPending } = useCreateChatMutate()
  const { onlineUsers, userChats, isLoading } = useChat()
  const { user } = useAuth()
  const router = useRouter()
  const token = Cookies.get('token')
  let chatIsExists: boolean

  const createChat = async (receiverId: string) => {
    if (userChats) {
      userChats?.forEach((item) => {
        if (item.participants[0].id === receiverId) {
          chatIsExists = true
        }
      })
    }

    if (chatIsExists) {
      toast.info('Você já tem um chat com esse usuário.')
      return
    }

    if (user) {
      mutate({ userId: user.id, receiverId })
    }
  }

  useEffect(() => {
    if (!token) router.push('/')
  }, [])

  return (
    <ContainerMain>
      <div className="h-[90%] w-[90%] rounded-lg">
        <div className="flex h-full text-slate-950 gap-5">
          <div className="bg-slate-500 bg-opacity-40 h-full w-[32%] rounded-lg shadow-lg">
            <Profile />
            <span className="p-1 ml-4 flex gap-2 text-gray-700">
              <UsersRound />
              Usuários online:
            </span>
            <div className="p-2 flex flex-col">
              {onlineUsers?.map((item: IOnlineUsers) => (
                <div
                  key={item.user.id}
                  className="flex items-center gap-2 p-2 hover:bg-slate-200 hover:bg-opacity-30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      {item?.user.imageUrl ? (
                        <>
                          <div className="w-12 h-12 overflow-y-hidden rounded-full flex items-center bg-red-500 justify-center">
                            <Image
                              src={item.user.imageUrl}
                              width={100}
                              height={100}
                              alt="user-icon"
                              className="rounded-full cursor-pointer"
                            />
                          </div>
                        </>
                      ) : (
                        <ProfilePicture widht="48" height="48" />
                      )}

                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{item.user.name}</span>
                    <button
                      onClick={() => createChat(item.user.id)}
                      className="hover:text-blue-500"
                      disabled={isPending}
                    >
                      Iniciar chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <span className="p-1 ml-4 flex gap-2 text-gray-700">
              <MessageSquare />
              Seus chats:
            </span>
            {isLoading ? (
              <div className="w-full p-3 flex items-center justify-center">
                <LoadingIcon />
              </div>
            ) : userChats?.length === 0 ? (
              <div className="flex items-center justify-center m-2 gap-1">
                <span>Você ainda não tem nenhuma conversa</span> <Frown />
              </div>
            ) : (
              userChats?.map((item: IUserChats) => (
                <div
                  key={item.id}
                  className="px-2 py-1"
                  onClick={() => setReceiver(item)}
                >
                  <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-200 hover:bg-opacity-30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        {item?.participants[0].imageUrl ? (
                          <>
                            <div className="w-12 h-12 overflow-y-hidden rounded-full flex items-center bg-red-500 justify-center">
                              <Image
                                src={item.participants[0].imageUrl}
                                width={100}
                                height={100}
                                alt="user-icon"
                                className="rounded-full cursor-pointer"
                              />
                            </div>
                          </>
                        ) : (
                          <ProfilePicture widht="48" height="48" />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {item.participants[0].name}
                      </span>
                      <span>{item.lastMessage}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <ChatBox receiver={receiver} />
        </div>
      </div>
    </ContainerMain>
  )
}

export default ContainerChat
