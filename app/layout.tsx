import './globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Provided from '@/components/provided'
import { stringify } from '@aiszlab/relax/class-name'
import { GoogleAnalytics } from '@next/third-parties/google'
import { type ReactNode } from 'react'
import { cookies } from 'next/headers'
import { AUTHENTICATION_TOKEN } from '@/constants/authentication'

interface Props {
  children: ReactNode
}

const geist = Geist({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: '我的技术站点 - tutu.me',
  description: 'welecome to tutu.me'
}

const Layout = async ({ children }: Props) => {
  const authenticated = (await cookies()).get(AUTHENTICATION_TOKEN.authentication)?.value ?? null

  return (
    <html lang='zh-cn'>
      <head>
        {!!authenticated && (
          <script
            dangerouslySetInnerHTML={{
              __html: `sessionStorage.setItem('${AUTHENTICATION_TOKEN.authentication}', '${authenticated}')`
            }}
          />
        )}
      </head>

      <body className={stringify(geist.className)}>
        <Provided>{children}</Provided>
      </body>

      <GoogleAnalytics gaId='G-PSXENQ5JKD' />
    </html>
  )
}

export default Layout
