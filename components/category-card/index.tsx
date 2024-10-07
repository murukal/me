'use client'

import { type CSSProperties } from 'react'
import styles from './styles.module.css'
import { clsx } from '@aiszlab/relax'
import { useTheme } from 'musae'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
  style?: CSSProperties
  label: string
  src: string
  code: string
}

const CategoryCard = ({ className, style, label, src, code }: Props) => {
  const theme = useTheme()
  const router = useRouter()

  const toArticles = () => {
    const query = new URLSearchParams({
      category: code
    })
    router.push(`/articles?${query.toString()}`)
  }

  return (
    <div
      className={clsx(
        'pl-7 pt-8 h-52 rounded-md hover:shadow-2xl transition-all cursor-pointer select-none',
        'flex flex-col gap-8',
        styles.category,
        className
      )}
      style={
        {
          '--background-color': theme.colors['surface-container-low'],
          '--hovered-background-color': theme.colors['primary'],
          '--hovered-color': theme.colors['on-primary'],
          ...style
        } as CSSProperties
      }
      onClick={toArticles}
    >
      <div
        className={clsx(
          'w-14 h-14 transition-colors rounded-md',
          'flex justify-center items-center',
          styles['tech-logo']
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://${src}`} alt={label} width={32} height={32} />
      </div>
      <span className='text-2xl font-bold'>{label}</span>
    </div>
  )
}

export default CategoryCard
