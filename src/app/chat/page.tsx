'use client'
import Image from 'next/image'
import messages from '../../data/messages'
import ChatBox from '../components/chatbox'
import ContainerMain from '../components/container-main'
import { useChat } from '../hooks/useChat'
import Profile from '../components/profile'
import ProfilePicture from '../components/profile-picture'
import { IOnlineUsers } from '../../types/online-users'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const ContainerChat = () => {
  const { onlineUsers } = useChat()
  const router = useRouter()
  const token = Cookies.get('token')

  if (!token) router.push('/')

  return (
    <ContainerMain>
      <div className="h-[90%] w-[90%] rounded-lg">
        <div className="flex h-full text-slate-950 gap-5">
          <div className="bg-slate-500 bg-opacity-40 h-full w-[32%] rounded-lg shadow-lg">
            <Profile />
            <div className="p-2 flex flex-col">
              {onlineUsers?.map((item: IOnlineUsers) => (
                <div key={item.user.id} className="flex items-center gap-2 p-2">
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
                    <span>Comece uma conversa!</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ChatBox messages={messages} />
        </div>
      </div>
    </ContainerMain>
  )
}

export default ContainerChat
