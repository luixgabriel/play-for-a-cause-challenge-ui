'use client'
import ContainerMain from '../components/container-main'
import { FileInput } from '../components/drag-drop-input'

const RegisterPage = () => {
  const handleFileChange = async () => {
    console.log('oi')
  }
  return (
    <ContainerMain>
      <div className="flex min-h-[90%] max-w-[60%] rounded-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto bg-neutral-800 bg-opacity-10 shadow-lg text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" mt-5 text-center text-2xl leading-9">Registre-se</h2>
        </div>

        <div className="mt-8 w-full">
          <form className="space-y-6">
            <div className="flex w-full items-center justify-center gap-8">
              <div className=" w-[50%]">
                {' '}
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
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-base leading-6 "
                  >
                    Nome
                  </label>
                  <div className="mt-2">
                    <input
                      name="name"
                      type="text"
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
                      name="password"
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black  focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>
              </div>

              <div className="my-4">
                <span className="text-sm leading-3 pl-2 text-white">
                  A imagem é opcional!
                </span>
                <FileInput onFileChanges={handleFileChange} />
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
        </div>
      </div>
    </ContainerMain>
  )
}

export default RegisterPage
