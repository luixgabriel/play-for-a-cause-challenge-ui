interface ContainerMainProps {
    children: React.ReactNode
  }
  

const ContainerMain = ({ children }: ContainerMainProps) => {
  return (
    <main className="p-5 w-screen h-screen bg-gradient-to-r from-blue-300 to-teal-500">
      {children}
    </main>
  )
}

export default ContainerMain
