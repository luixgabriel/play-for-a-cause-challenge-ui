import { Laugh, MessagesSquare, SendHorizonal } from 'lucide-react'
import { IMessage } from '../../data/messages'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { io } from 'socket.io-client'
import { IUserChats } from '../../types/user-chats'

interface IChatBoxProps {
  messages?: IMessage[]
  receiver: IUserChats | null
}

const ChatBox = ({ receiver }: IChatBoxProps) => {
  const [message, setMessage] = useState<string>('')
  const [messageList, setMessageList] = useState<any>([])
  const { user } = useAuth()

  // useEffect(() => {
  //   newSocket.on('sendMessage', (data) => {
  //     console.log(data)
  //     setMessageList((prev) => [...prev, message])
  //   })
  // }, [messageList])

  // const enviaMensagem = async () => {
  //   newSocket.emit('sendMessage', message)
  // }
  return (
    <div className="w-[68%] flex flex-col place-content-between bg-slate-500 bg-opacity-40 shadow-lg rounded-lg">
      <div className="bg-neutral-800 bg-opacity-10 w-full flex justify-center items-center p-5 gap-4 overflow-y-hidden">
        <MessagesSquare width={48} height={48} />
        <span className="text-2xl">{receiver?.participants[0].name || ''}</span>
      </div>
      <div className="h-full">
        <div className="flex flex-col p-3">
          {receiver ? (
            receiver.Messages?.map((item: IMessage) => (
              <span
                key={item.id}
                className={`p-3  rounded-2xl justify-center my-2 mx-1 ${
                  item.senderId === user?.id
                    ? 'self-start bg-blue-400'
                    : 'self-end bg-blue-200 '
                }`}
              >
                {item.content}
              </span>
            ))
          ) : (
            <div className="flex items-center justify-center mt-52">
              <h1 className="text-2xl flex items-center gap-2">
                Tome inciativa! Inicie uma conversa
                <Laugh size={30} />
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center my-3 gap-2 overflow-y-hidden h-16 ">
        <input
          type="text"
          placeholder="Digite sua mensagem"
          className="block w-[90%] rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset focus:outline-none"
        />
        <div className="bg-teal-500 p-3 rounded-full">
          <SendHorizonal color="white" width={20} height={20} />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
