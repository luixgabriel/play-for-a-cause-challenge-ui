import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="flex min-h-[90%] rounded-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-lg mx-auto bg-neutral-800 bg-opacity-10 shadow-lg text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" mt-5 text-center text-2xl leading-9">Entrar com</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-base leading-6 "
            >
              Email
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                className='  className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"'
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
                name="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blak px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm font-base">
          Novo no bolhadev_help?{' '}
          <Link
            href="/register"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Crie sua conta aqui.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
