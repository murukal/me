import { Button, useTheme } from 'musae'
import { Bedtime, WbSunny } from 'musae/icons'

const Lamp = () => {
  const { mode, toggle } = useTheme()

  return (
    <Button shape='circular' variant='text' onClick={toggle}>
      {mode === 'dark' ? <WbSunny /> : <Bedtime />}
    </Button>
  )
}

export default Lamp
