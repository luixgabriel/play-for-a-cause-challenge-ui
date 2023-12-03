import React from 'react'
import ProfilePicture from './profile-picture'
import Image from 'next/image'
import { IUserChats } from '../../types/user-chats'
import { MessageSquare } from 'lucide-react'
import { useChat } from '../hooks/useChat'

const UserChats = () => {
  const { userChats } = useChat()
  const isLoading = false
  console.log(userChats)
  return (
    <>
      {/* <span className="p-1 ml-4 flex gap-2 text-gray-700">
        <MessageSquare />
        Seus chats:
      </span>
      {isLoading ? (
        <h1>carregando</h1>
      ) : userChats?.length === 0 ? (
        <h1>sem chats</h1>
      ) : (
        userChats?.map((item: IUserChats) => (
          <div key={item.id} className="px-2 py-1">
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

                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{item.participants[0].name}</span>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          </div>
        ))
      )} */}
    </>
  )
}

export default UserChats
