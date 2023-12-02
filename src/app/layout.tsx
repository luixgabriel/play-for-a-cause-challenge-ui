import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import { DefaultProviders } from './components/default-providers'

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Play for a cause CHAT',
  description: 'Desafio para a vaga de dev jr Play for a cause',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer position="bottom-right" theme="dark" autoClose={1500} />
        <DefaultProviders>{children}</DefaultProviders>
      </body>
    </html>
  )
}
