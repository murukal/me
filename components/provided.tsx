'use client'

import { Bench, ConfigProvider, ThemeProvider } from 'musae'
import type { ReactNode } from 'react'
import Lamp from '@/components/lamp'
import { client } from '@/api'
import { ApolloProvider } from '@apollo/client'
import Account from './account'
import Logo from './logo'
import { AddAlert } from 'musae/icons'
import dynamic from 'next/dynamic'

interface Props {
  children: ReactNode
}

const Fab = dynamic(() => import('musae').then(({ Fab }) => Fab), { ssr: false })

const Provided = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider>
        <ThemeProvider>
          <Bench
            title={<Logo />}
            trailing={
              <div className='flex gap-4 items-center'>
                <Lamp />
                <Account />
              </div>
            }
          >
            {children}
          </Bench>

          <Fab
            onClick={() => {
              window.open('https://admin.fantufantu.com/issue')
            }}
          >
            <AddAlert />
          </Fab>
        </ThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default Provided
