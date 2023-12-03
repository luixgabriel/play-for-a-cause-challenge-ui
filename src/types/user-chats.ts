import { IMessage } from './messages'

export interface IParticipants {
  id: string
  name: string
  imageUrl?: string
}

export interface IUserChats {
  id: string
  lastMessage: string | null
  createdAt: string
  participants: IParticipants[]
  Messages?: IMessage[]
}
