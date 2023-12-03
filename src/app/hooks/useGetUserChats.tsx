import { useQuery } from '@tanstack/react-query'
import { userChats } from '../../services/requests'
import { IUserChats } from '../../types/user-chats'

export function useFetchUserChats() {
  const query = useQuery({
    queryFn: () => userChats(),
    queryKey: ['user-chats'],
    retry: 2,
  })

  return {
    ...query,
    data: query.data?.data as IUserChats[],
  }
}
