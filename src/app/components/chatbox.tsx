import { Laugh, MessagesSquare, SendHorizonal } from 'lucide-react'
import { IMessage } from '../../data/messages'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { io } from 'socket.io-client'
import { IUserChats } from '../../types/user-chats'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useChat } from '../hooks/useChat'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '../lib/axios'
import { getMessagesOfChat } from '../../services/requests'

interface IChatBoxProps {
  messages?: IMessage[]
  receiver: IUserChats | null
}

const ChatBox = ({ receiver }: IChatBoxProps) => {
  const [messageList, setMessageList] = useState<any>([])
  const [chatMessages, setChatMessages] = useState<any>([])
  const { register, handleSubmit } = useForm<{ content: string }>()
  const queryClient = useQueryClient()
  const { socket } = useChat()
  const { user } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getMessagesOfChat(receiver?.id as string),
    queryKey: ['fetchMessagesOfChat', receiver?.id],
    retry: 2,
  })

  const onSubmit: SubmitHandler<{ content: string }> = (data) => {
    const sendToSocket = {
      content: data.content,
      senderId: user?.id,
      receiverId: receiver?.participants[0].id,
      chatId: receiver?.id,
    }

    socket?.emit('sendMessage', sendToSocket)
  }

  useEffect(() => {
    async function getMessages() {
      if (receiver) {
        // Dispare a requisição usando o React Query
        const res = await queryClient.fetchQuery({
          queryFn: () => getMessagesOfChat(receiver?.id as string),
          queryKey: ['fetchMessagesOfChat', receiver?.id],
        })
        setChatMessages(res.data)
        queryClient.invalidateQueries({ queryKey: ['fetchMessagesOfChat'] })
      }
    }
    getMessages()
  }, [receiver, queryClient, messageList])

  useEffect(() => {
    socket?.on('sendMessage', (data) => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['user-chats'],
      })
      setMessageList((prev: any) => [...prev, data.content])
    })

    return () => {
      socket?.disconnect()
      socket?.off('sendMessage')
    }
  }, [socket])

  console.log(chatMessages)

  useEffect(() => {
    const getMessages = async () => {
      await axios.get('/messages/chat' + receiver?.id)
    }
  }, [receiver])

  return (
    <div className="w-[68%] flex flex-col place-content-between bg-slate-500 bg-opacity-40 shadow-lg rounded-lg">
      <div className="bg-neutral-800 bg-opacity-10 w-full flex justify-center items-center p-5 gap-4 overflow-y-hidden">
        <MessagesSquare width={48} height={48} />
        <span className="text-2xl">{receiver?.participants[0].name || ''}</span>
      </div>
      <div className="h-full">
        <div className="flex flex-col p-3">
          {receiver?.Messages?.length !== 0 ? (
            chatMessages?.map((item: IMessage) => (
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
            // Se receiver.Messages não existe ou está vazio
            <></>
          )}

          {messageList.length > 0 &&
            // Adiciona as mensagens de messageList
            messageList.map((item: any, index: number) => (
              <span key={index}>{item}</span>
            ))}

          {(!receiver?.Messages || receiver.Messages.length === 0) &&
            messageList.length === 0 && (
              // Se tanto receiver.Messages quanto messageList estão vazios
              <div className="flex items-center justify-center mt-52">
                <h1 className="text-2xl flex items-center gap-2">
                  Tome iniciativa! Inicie uma conversa
                  <Laugh size={30} />
                </h1>
              </div>
            )}
        </div>
      </div>
      <div className="flex justify-center items-center my-3 gap-2 overflow-y-hidden h-16 ">
        <form
          className="w-screen  flex gap-2 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Enviar mensagem"
            className="block w-[90%] rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset focus:outline-none"
            {...register('content', {
              required: 'Campo obrigatório',
            })}
          />

          <button className='bg-teal-500 p-3 rounded-full cursor-pointer"'>
            <SendHorizonal color="white" width={20} height={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBox
