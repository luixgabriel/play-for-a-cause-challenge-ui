import Image from 'next/image'
import users from '../../data/users'
import messages from '../../data/messages'
import ChatBox from './chatbox'

const ContainerChat = () => {
  return (
    <div className="bg-slate-500 bg-opacity-40 shadow-lg h-[90%] w-[90%] rounded-lg">
      <div className="flex h-full text-slate-950">
        <div className="bg-neutral-800 bg-opacity-10 h-full w-[32%]">
          <div className="flex items-center justify-center gap-3 py-3 px-5 bg-slate-700 bg-opacity-20">
            <Image
              src="https://avatars.githubusercontent.com/u/70019908?v=4"
              width={55}
              height={55}
              className="rounded-full"
              alt="user-photo"
            />
            <span className="text-lg">Luis Gabriel</span>
          </div>
          <div className="p-2 flex flex-col">
            {users.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Image
                      src="https://avatars.githubusercontent.com/u/70019908?v=4"
                      width={48}
                      height={48}
                      className="rounded-full"
                      alt="user-photo"
                    />
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">Luis</span>
                  <span>Boa noite! Tudo bem meu amigo?</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChatBox messages={messages} />
      </div>
    </div>
  )
}

export default ContainerChat
