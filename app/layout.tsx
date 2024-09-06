import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Provided from '@/components/provided'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'tutu.me',
  description: 'welecome to tutu.me'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-cn'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provided>{children}</Provided>
      </body>
    </html>
  )
}
