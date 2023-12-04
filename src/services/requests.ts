import axios from '../app/lib/axios'
import { LoginData } from '../types/login-schema'
import Cookies from 'js-cookie'

const registerData = async (data: {
  name: string
  email: string
  password: string
  image?: null | File
}) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('email', data.email)
  formData.append('password', data.password)
  if (data.image) formData.append('image', data.image)
  const response = await axios.post('/auth/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

const loginData = async (data: LoginData) => {
  const response = await axios.post('/auth/login', data)
  return response.data
}

const fetchUsers = async () => {
  const response = await axios.get('/users')
  return response
}

const createChat = async (data: { userId: string; receiverId: string }) => {
  const sendData = { participants: [data.userId, data.receiverId] }
  const token = Cookies.get('token')
  const response = await axios.post('/chat', sendData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}

const getMessagesOfChat = async (chatId: string | null) => {
  const response = await axios.get(`/message/chat/${chatId}`)
  return response
}

const userChats = async () => {
  const userId = Cookies.get('userId')
  const response = await axios.get(`/chat/user-chats/${userId}`)
  return response
}

export {
  loginData,
  fetchUsers,
  createChat,
  registerData,
  userChats,
  getMessagesOfChat,
}
