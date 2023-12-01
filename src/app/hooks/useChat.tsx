import { useContext } from 'react'
import { ChatContext } from '../contexts/chat-context'

export function useChat() {
  return useContext(ChatContext)
}
