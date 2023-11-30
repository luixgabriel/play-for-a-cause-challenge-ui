interface ContainerMainProps {
  children: React.ReactNode
}

const ContainerMain = ({ children }: ContainerMainProps) => {
  return (
    <main className="w-screen h-screen bg-gradient-to-r from-blue-300 to-teal-500 flex items-center justify-center">
      {children}
    </main>
  )
}

export default ContainerMain
