import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createChat } from '../../services/requests'

export function useCreateChatMutate() {
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: createChat,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doubts-data-by-id'] })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutate
}
