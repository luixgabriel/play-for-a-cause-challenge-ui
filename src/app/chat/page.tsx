'use client'
import Image from 'next/image'
import users from '../../data/users'
import messages from '../../data/messages'
import ChatBox from '../components/chatbox'
import ContainerMain from '../components/container-main'
import { useChat } from '../hooks/useChat'

import Profile from '../components/profile'
import { useAuth } from '../hooks/useauth'

const ContainerChat = () => {
  const { onlineUsers } = useChat()
  const { user } = useAuth()

  console.log(user)

  return (
    <ContainerMain>
      <div className="h-[90%] w-[90%] rounded-lg">
        <div className="flex h-full text-slate-950 gap-5">
          <div className="bg-slate-500 bg-opacity-40 h-full w-[32%] rounded-lg shadow-lg">
            <Profile />
            <div className="p-2 flex flex-col">
              {users.map((item) => (
                <div key={item.id} className="flex items-center gap-2 p-2">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Image
                        src="https://avatars.githubusercontent.com/u/70019908?v=4"
                        width={48}
                        height={48}
                        className="rounded-full"
                        alt="user-photo"
                      />
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">Luis</span>
                    <span>Boa noite! Tudo bem meu amigo?</span>
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
