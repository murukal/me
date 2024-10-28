'use client'

import type { CSSProperties, ReactNode } from 'react'
import { stringify } from '@aiszlab/relax/class-name'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const Box = ({ children, className, style }: Props) => {
  return (
    <div className={stringify('max-w-[120ch] mx-auto', className)} style={style}>
      {children}
    </div>
  )
}

export default Box
