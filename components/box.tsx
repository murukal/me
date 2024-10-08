'use client'

import type { CSSProperties, ReactNode } from 'react'
import { clsx } from '@aiszlab/relax'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const Box = ({ children, className, style }: Props) => {
  return (
    <div className={clsx('max-w-[120ch] mx-auto', className)} style={style}>
      {children}
    </div>
  )
}

export default Box
