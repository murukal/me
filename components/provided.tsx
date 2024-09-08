'use client'
import { Bench, ConfigProvider, ThemeProvider } from 'musae'
import type { ReactNode } from 'react'
import Lamp from '@/components/lamp'

interface Props {
  children: ReactNode
}

const Provided = ({ children }: Props) => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <Bench trailing={<Lamp />}>{children}</Bench>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default Provided
