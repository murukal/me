'use client'

import { Bench, ConfigProvider, ThemeProvider, Fab } from 'musae'
import type { ReactNode } from 'react'
import Lamp from '@/components/lamp'
import { client } from '@/api'
import { ApolloProvider } from '@apollo/client'
import Account from './account'
import Logo from './logo'
import { AddAlert } from 'musae/icons'

interface Props {
  children: ReactNode
}

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
          <Fab>
            <AddAlert
              onClick={() => {
                window.open('https://admin.fantufantu.com/issue')
              }}
            />
          </Fab>
        </ThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default Provided
