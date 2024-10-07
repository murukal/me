import { random } from '@aiszlab/fuzzy/avatar'
import { useMounted } from '@aiszlab/relax'
import { useState } from 'react'

/**
 * @description
 * random avatar
 */
export const useRandomAvatar = (src?: string | null) => {
  const [avatar, setAvatar] = useState(src ?? '')

  useMounted(async () => {
    setAvatar(await random().catch(() => ''))
  })

  return avatar
}
