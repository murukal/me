'use client'

import { WHO_AM_I } from '@/api/authentication'
import { useRandomAvatar } from '@/hooks/use-random-avatar'
import { isDomUsable } from '@aiszlab/relax'
import { useQuery } from '@apollo/client'
import { Avatar, Skeleton, useTheme } from 'musae'
import { AccountCircle } from 'musae/icons'
import Link from 'next/link'
import { useMemo } from 'react'

const Account = () => {
  const { data: { whoAmI } = {}, loading } = useQuery(WHO_AM_I)
  const avatar = useRandomAvatar()
  const theme = useTheme()

  const href = useMemo(() => {
    if (!isDomUsable()) return ''

    const url = new URL('/sign-up', 'https://admin.fantufantu.com')
    url.searchParams.append('redirect', window.location.href)
    return url.toString()
  }, [])

  if (loading) {
    return <Skeleton className='w-6 h-6 rounded-full' />
  }

  if (!whoAmI) {
    return (
      <Link href={href}>
        <AccountCircle size={24} color={theme.colors.primary} />
      </Link>
    )
  }

  return <Avatar src={whoAmI?.avatar ?? avatar} size='small' />
}

export default Account
