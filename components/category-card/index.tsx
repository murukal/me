import { type ReactNode, type CSSProperties } from 'react'
import styles from './styles.module.css'
import { clsx } from '@aiszlab/relax'
import { useTheme } from 'musae'

interface Props {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  label: string
}

const CategoryCard = ({ className, style, children, label }: Props) => {
  const theme = useTheme()

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
    >
      <div className={clsx('p-3 transition-colors rounded-md w-fit', styles['tech-logo'])}>{children}</div>
      <span className='text-2xl font-bold'>{label}</span>
    </div>
  )
}

export default CategoryCard
