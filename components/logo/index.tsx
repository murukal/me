import { useTheme } from 'musae'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const theme = useTheme()
  const router = useRouter()

  const toHome = () => {
    router.push('/')
  }

  return (
    <h4 className='text-3xl font-semibold select-none cursor-pointer' onClick={toHome}>
      tutu
      <span className='text-lg font-bold' style={{ color: theme.colors['primary'] }}>
        .me
      </span>
    </h4>
  )
}

export default Logo
