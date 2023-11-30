import Image from 'next/image'
import ContainerMain from './components/container-main'
import ContainerChat from './components/container-chat'

export default function Home() {
  return (
    <ContainerMain>
      <ContainerChat />
    </ContainerMain>
  )
}
