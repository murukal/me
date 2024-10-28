import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Provided from '@/components/provided'
import { cookies } from 'next/headers'
import { stringify } from '@aiszlab/relax/class-name'
import { ApplicationToken } from '@/assets/token'
import { GoogleAnalytics } from '@next/third-parties/google'

interface Props {
  children: React.ReactNode
}

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

const Layout = ({ children }: Props) => {
  const authenticated = cookies().get(ApplicationToken.Authenticated)?.value

  return (
    <html lang='zh-cn'>
      <head>
        {!!authenticated && (
          <script
            dangerouslySetInnerHTML={{
              __html: `globalThis.window.sessionStorage.setItem('${ApplicationToken.Authenticated}', '${authenticated}')`
            }}
          />
        )}
      </head>

      <body className={stringify(geistSans.variable, geistMono.variable, 'antialiased')}>
        <Provided>{children}</Provided>
      </body>

      <GoogleAnalytics gaId='G-PSXENQ5JKD' />
    </html>
  )
}

export default Layout
