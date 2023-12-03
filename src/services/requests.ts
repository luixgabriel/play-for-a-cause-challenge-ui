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
  console.log(data)
  const sendData = { participants: [data.userId, data.receiverId] }
  const token = Cookies.get('token')
  const response = await axios.post('/chat', sendData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response)
  return response
}

const getMessagesOfChat = async (chatId: string | null) => {
  const response = await axios.get(`/message/chat/${chatId}`)
  console.log(response)
  return response
}

const userChats = async () => {
  const userId = Cookies.get('userId')
  const response = await axios.get(`/chat/user-chats/${userId}`)
  return response
}

// const createAnswer = async (data: {
//   description: string
//   doubtsId: string
//   userId?: string
// }) => {
//   const token = Cookies.get('token')
//   const userId = Cookies.get('userId')
//   if (userId) data = { ...data, userId }
//   const response = await axios.post('answers/', data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   })
//   return response
// }

// const likeAnswer = async (id: string) => {
//   const token = Cookies.get('token')
//   if (!token) return toast.error('Você precisa estar autenticado para isso.')
//   const userId = Cookies.get('userId')
//   if (!userId) return toast.error('Você precisa estar autenticado para isso.')
//   const data = { userId }
//   const response = await axios.patch(`/answers/like/${id}`, data)
//   return response
// }

// const dislikeAnswer = async (id: string) => {
//   const token = Cookies.get('token')
//   if (!token) return toast.error('Você precisa estar autenticado para isso.')
//   const userId = Cookies.get('userId')
//   if (!userId) return toast.error('Você precisa estar autenticado para isso.')
//   const data = { userId }
//   const response = await axios.patch(`/answers/dislike/${id}`, data)
//   return response
// }

// const createComment = async (data: {
//   content: string
//   answerId: string
//   userId?: string
// }) => {
//   const token = Cookies.get('token')
//   const userId = Cookies.get('userId')
//   if (userId) data = { ...data, userId }
//   const response = await axios.post('comment', data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   })
//   return response
// }

// const likeComment = async (id: string) => {
//   const token = Cookies.get('token')
//   if (!token) return toast.error('Você precisa estar autenticado para isso.')
//   const userId = Cookies.get('userId')
//   if (!userId) return toast.error('Você precisa estar autenticado para isso.')
//   const data = { userId }
//   const response = await axios.patch(`/comment/like/${id}`, data)

//   return response
// }

// const dislikeComment = async (id: string) => {
//   const token = Cookies.get('token')
//   if (!token) return toast.error('Você precisa estar autenticado para isso.')
//   const userId = Cookies.get('userId')
//   if (!userId) return toast.error('Você precisa estar autenticado para isso.')
//   const data = { userId }
//   const response = await axios.patch(`/comment/dislike/${id}`, data)
//   console.log(response)
//   return response
// }

// const createDoubt = async (data: {
//   title: string
//   category: string
//   description: string
//   image?: null | File
//   userId?: string
// }) => {
//   const token = Cookies.get('token')
//   const userId = Cookies.get('userId')
//   const formData = new FormData()
//   formData.append('title', data.title)
//   formData.append('category', data.category)
//   formData.append('description', data.description)
//   formData.append('userId', userId as string)
//   if (data.image) formData.append('image', data.image)
//   const response = await axios.post('doubts', formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//   return response
// }

// const editDoubt = async (data: {
//   title?: string
//   category?: string
//   description?: string
//   image?: null | File
//   userId?: string
//   doubtsId: string
// }) => {
//   const token = Cookies.get('token')
//   const userId = Cookies.get('userId')
//   const formData = new FormData()

//   formData.append('title', data.title || '')

//   if (data.category) {
//     formData.append('category', data.category)
//   }
//   if (data.description) {
//     formData.append('description', data.description)
//   }
//   if (data.image) formData.append('image', data.image)
//   formData.append('userId', userId as string)
//   console.log(formData)

//   const response = await axios.patch(`doubts/${data.doubtsId}`, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//   return response
// }

// const deleteDoubt = async (id: string) => {
//   const token = Cookies.get('token')
//   const response = await axios.delete(`/doubts/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   console.log(response)
//   return response
// }

// const fetchDoubtsByUser = async (id: string) => {
//   const response = await axios.get(`/doubts/user-doubts/${id}`)
//   return response
// }

export {
  loginData,
  fetchUsers,
  createChat,
  registerData,
  userChats,
  getMessagesOfChat,
}
