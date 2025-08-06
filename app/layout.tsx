import './globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Provided from '@/components/provided'
import { stringify } from '@aiszlab/relax/class-name'
import { GoogleAnalytics } from '@next/third-parties/google'
import { type ReactNode } from 'react'
import { Authenticated } from '@aiszlab/relax/next'

interface Props {
  children: ReactNode
}

const geist = Geist({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'tutu.me',
  description: 'welecome to tutu.me'
}

const Layout = async ({ children }: Props) => {
  return (
    <html lang='zh-cn'>
      <head>
        <Authenticated />
      </head>

      <body className={stringify(geist.className)}>
        <Provided>{children}</Provided>
      </body>

      <GoogleAnalytics gaId='G-PSXENQ5JKD' />
    </html>
  )
}

export default Layout
