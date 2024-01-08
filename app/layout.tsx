import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { NextAuthProvider } from './lib/next-auth/provider'
// import { SessionProvider } from 'next-auth/react'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Book commerce',
  description: 'Generated by create next app',
}

// 共通コンポーネントはlayoutに置く

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        {/* providerはclientサイドに置きたいがlayoutに直で置くとすべてclientサイドになるのでコンポーネント化する */}
        <NextAuthProvider>
        <Header />
        {children}
        </NextAuthProvider>
        </body>
    </html>
  )
}
