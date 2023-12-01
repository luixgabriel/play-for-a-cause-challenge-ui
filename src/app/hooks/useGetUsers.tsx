import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../../services/requests'
import { IUser } from '../../types/user'

export function useFetchUser() {
  const query = useQuery({
    queryFn: () => fetchUsers(),
    queryKey: ['fetchUsers'],
    retry: 2,
  })

  return {
    ...query,
    data: query.data?.data as IUser[],
  }
}
