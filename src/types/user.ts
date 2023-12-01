export interface IUserDecoded {
  id: string
  name: string
  imageUrl: string | null
  token: string
}

export interface IUser {
  id: string
  name: string
  email: string
  imageUrl: string | null
  chats?: any[]
  messages?: any[]
  createdAt: string
}
