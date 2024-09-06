'use client'
import { Bench, ConfigProvider, ThemeProvider } from 'musae'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Provided = ({ children }: Props) => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <Bench>{children}</Bench>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default Provided
