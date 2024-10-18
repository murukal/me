import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Provided from '@/components/provided'
import 'musae/styles'
import './globals.css'
import { cookies } from 'next/headers'
import { clsx } from '@aiszlab/relax'
import { ApplicationToken } from '@/assets/token'

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
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-RNQNB5PVNK' />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-RNQNB5PVNK');`
          }}
        />

        {!!authenticated && (
          <script
            dangerouslySetInnerHTML={{
              __html: `globalThis.window.sessionStorage.setItem('${ApplicationToken.Authenticated}', '${authenticated}')`
            }}
          />
        )}
      </head>

      <body className={clsx(geistSans.variable, geistMono.variable, 'antialiased')}>
        <Provided>{children}</Provided>
      </body>
    </html>
  )
}

export default Layout
