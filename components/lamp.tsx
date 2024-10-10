import { useTheme } from 'musae'
import { Bedtime, WbSunny } from 'musae/icons'
import { createElement } from 'react'

const Lamp = () => {
  const { mode, toggle, colors } = useTheme()
  const isDark = mode === 'dark'

  return createElement(isDark ? WbSunny : Bedtime, {
    size: 24,
    onClick: toggle,
    color: colors.primary
  })
}

export default Lamp
