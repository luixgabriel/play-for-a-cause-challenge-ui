import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createChat } from '../../services/requests'
import { useChat } from './useChat'

export function useCreateChatMutate() {
  const { setPendingChat } = useChat()
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: createChat,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-chats'] })
      setPendingChat(null)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutate
}
