'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { ChatProvider } from '../contexts/chat-context'
import { AuthProvider } from '../contexts/auth-context'
import { useAuth } from '../hooks/useAuth'
import { IUserDecoded } from '../../types/user'

interface DefaultProvidersProps {
  children: ReactNode
}

export function DefaultProviders({ children }: DefaultProvidersProps) {
  const client = new QueryClient()
  const { user } = useAuth()
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ChatProvider user={user as IUserDecoded}>{children}</ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
