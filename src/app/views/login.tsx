'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginData, loginSchema } from '../../types/login-schema'
import { useLoginDataMutate } from '../hooks/useLoginDataMutate'
import ProfilePicture from '../components/profile-picture'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import LoadingScreen from '../components/loading-screen'
import LoadingIcon from '../components/loading-icon'

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })
  const { mutate, isPending } = useLoginDataMutate()
  const router = useRouter()
  const token = Cookies.get('token')

  const onSubmit = async (data: LoginData) => {
    mutate(data)
  }
  if (token) router.push('chat')
  return (
    <div className="flex min-h-[90%] rounded-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-lg mx-auto bg-neutral-800 bg-opacity-10 shadow-lg ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
        <ProfilePicture widht="155" height="155" />
        <h2 className=" mt-5 text-center text-2xl leading-9">Entrar com</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-base leading-6 "
            >
              Email
            </label>
            <div className="mt-2">
              <input
                {...register('email')}
                name="email"
                type="email"
                className='  className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"'
              />
            </div>
            {errors.email && (
              <p className="text-red-500  mt-1">{errors.email.message}</p>
            )}
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
                {...register('password')}
                name="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"
              />
              {errors.password && (
                <p className="text-red-500  mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-1/2 mx-auto justify-center rounded-md bg-blak px-3 py-1.5  font-semibold leading-6 shadow-sm  bg-gradient-to-r from-teal-300 to-blue-200  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isPending ? <LoadingIcon /> : 'Entrar'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center font-base">
          Novo por aqui?{' '}
          <Link
            href="/register"
            className="font-semibold leading-6  hover:text-blue-200"
          >
            Crie sua conta!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
