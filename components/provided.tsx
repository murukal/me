'use client'

import { Bench, ConfigProvider, ThemeProvider } from 'musae'
import type { ReactNode } from 'react'
import Lamp from '@/components/lamp'
import { client } from '@/api'
import { ApolloProvider } from '@apollo/client'
import Account from './account'
import Logo from './logo'

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
              <>
                <Lamp />
                <Account />
              </>
            }
          >
            {children}
          </Bench>
        </ThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default Provided
