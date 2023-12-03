import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { registerData } from '../../services/requests'

export function useRegisterDataMutate() {
  const mutate = useMutation({
    mutationFn: registerData,
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
      toast.error('Erro ao tentar fazer login!')
    },
  })

  return mutate
}
