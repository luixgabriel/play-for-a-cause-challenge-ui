import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { loginData } from '../../services/requests'

export function useLoginDataMutate() {
  const router = useRouter()
  const mutate = useMutation({
    mutationFn: loginData,
    retry: 2,
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data))
      //   Cookies.set('token', data.token)
      toast.success('Usuário autenticado com sucesso!')
      router.push('/chat')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Erro ao fazer login!')
    },
  })

  return mutate
}
