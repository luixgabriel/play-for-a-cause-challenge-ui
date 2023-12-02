'use client'
import { useForm } from 'react-hook-form'
import ContainerMain from '../components/container-main'
import { FileInput } from '../components/drag-drop-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterData, registerSchema } from '../../types/register-schema'
import { useRegisterDataMutate } from '../hooks/useRegisterDataMutate'
import { useEffect, useState } from 'react'
import LoadingIcon from '../components/loading-icon'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })
  const token = Cookies.get('token')
  const [image, setImage] = useState<File | null>(null)
  const router = useRouter()
  const { mutate, isPending } = useRegisterDataMutate()

  const handleFileChange = async (file: File) => {
    setImage(file)
  }

  const onSubmit = async (data: RegisterData) => {
    const newData = { ...data, image }
    mutate(newData)
  }

  useEffect(() => {
    if (!token) router.push('/')
  }, [])

  return (
    <ContainerMain>
      <div className="flex min-h-[90%] max-w-[60%] rounded-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto bg-neutral-800 bg-opacity-10 shadow-lg text-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" mt-5 text-center text-2xl leading-9">Registre-se</h2>
        </div>

        <div className="mt-5 w-full">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full items-center justify-center gap-8">
              <div className=" w-[50%]">
                {' '}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-base leading-6 "
                  >
                    Nome
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('name', { required: 'Campo obrigatório' })}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-base leading-6 "
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      {...register('email', { required: 'Campo obrigatório' })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm leading-6 font-base"
                    >
                      Senha
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      {...register('password', {
                        required: 'Campo obrigatório',
                      })}
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>
              </div>

              <div className="my-4">
                <span className="text-sm leading-3 pl-2 text-gray-600">
                  A imagem é opcional!
                </span>
                <FileInput onFileChanges={handleFileChange} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex mx-auto w-1/2 justify-center rounded-md bg-blak px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm bg-gradient-to-r from-teal-300 to-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isPending ? <LoadingIcon /> : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContainerMain>
  )
}

export default RegisterPage
