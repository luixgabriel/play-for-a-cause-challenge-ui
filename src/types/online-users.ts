export interface IOnlineUsers {
  user: {
    id: string
    email: string
    name: string
    imageUrl: string | null
    password: string
    createdAt: string
  }
  socketId: string
}
