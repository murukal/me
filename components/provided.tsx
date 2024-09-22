'use client'
import { Bench, ConfigProvider, ThemeProvider } from 'musae'
import type { ReactNode } from 'react'
import Lamp from '@/components/lamp'
import { client } from '@/api'
import { ApolloProvider } from '@apollo/client'

interface Props {
  children: ReactNode
}

const Provided = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider>
        <ThemeProvider>
          <Bench trailing={<Lamp />}>{children}</Bench>
        </ThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default Provided
