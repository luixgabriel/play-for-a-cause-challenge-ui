'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ChatProvider } from '../contexts/chat-context'
import { AuthProvider } from '../contexts/auth-context'
import { IUserDecoded } from '../../types/user'
import { useAuth } from '../hooks/useAuth'

interface DefaultProvidersProps {
  children: ReactNode
}

export function DefaultProviders({ children }: DefaultProvidersProps) {
  const client = new QueryClient()
  let user
  if (typeof localStorage !== 'undefined') {
    const userLocalStorage = localStorage.getItem('user')
    user = JSON.parse(userLocalStorage as string)
  }

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ChatProvider user={user as IUserDecoded}>{children}</ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
