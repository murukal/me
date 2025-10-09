import { AUTHENTICATION_TOKEN } from '@/constants/authentication'
import { isDomUsable } from '@aiszlab/relax'
import { Nullable } from '@aiszlab/relax/types'

/**
 * 获取当前应用认证信息
 */
export const tryAuthenticate = async (): Promise<Nullable<string>> => {
  if (isDomUsable()) {
    return sessionStorage.getItem(AUTHENTICATION_TOKEN.authentication)
  }

  return (
    (await import('next/headers').then(({ cookies }) => cookies())).get(AUTHENTICATION_TOKEN.authentication)?.value ??
    null
  )
}
