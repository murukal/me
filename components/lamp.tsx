import { IconButton, useTheme } from 'musae'
import { Bedtime, WbSunny } from 'musae/icons'
import { createElement } from 'react'

const Lamp = () => {
  const { mode, toggle } = useTheme()
  const isDark = mode === 'dark'

  return (
    <IconButton onClick={toggle} variant='text' size='small'>
      {createElement(isDark ? WbSunny : Bedtime, {
        size: 16
      })}
    </IconButton>
  )
}

export default Lamp
