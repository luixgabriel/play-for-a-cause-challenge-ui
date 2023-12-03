import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { loginData } from '../../services/requests'
import Cookies from 'js-cookie'

export function useLoginDataMutate() {
  const mutate = useMutation({
    mutationFn: loginData,
    retry: 2,
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data))
      Cookies.set('token', data.token)
      Cookies.set('userId', data.id)
      toast.success('Usuário autenticado com sucesso!')
      window.location.replace('/chat')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Erro ao fazer login!')
    },
  })

  return mutate
}
