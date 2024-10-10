import { Button, useTheme } from 'musae'
import { Bedtime, WbSunny } from 'musae/icons'
import { createElement } from 'react'

const Lamp = () => {
  const { mode, toggle } = useTheme()
  const isDark = mode === 'dark'

  return (
    <Button onClick={toggle} variant='text' shape='circular'>
      {createElement(isDark ? WbSunny : Bedtime, {
        size: 16
      })}
    </Button>
  )
}

export default Lamp
