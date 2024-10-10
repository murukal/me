'use client'

import { WHO_AM_I } from '@/api/authentication'
import { useRandomAvatar } from '@/hooks/use-random-avatar'
import { isDomUsable } from '@aiszlab/relax'
import { useQuery } from '@apollo/client'
import { Avatar, Button, Skeleton } from 'musae'
import { AccountCircle } from 'musae/icons'
import Link from 'next/link'
import { useMemo } from 'react'

const Account = () => {
  const { data: { whoAmI } = {}, loading } = useQuery(WHO_AM_I)
  const avatar = useRandomAvatar()

  const href = useMemo(() => {
    if (!isDomUsable()) return ''

    const url = new URL('/sign-up', 'https://admin.fantufantu.com')
    url.searchParams.append('redirect', window.location.href)
    return url.toString()
  }, [])

  if (loading) {
    return <Skeleton className='w-8 h-8 rounded-full mx-1' />
  }

  if (!whoAmI) {
    return (
      <Link href={href}>
        <Button variant='text' shape='circular'>
          <AccountCircle size={16} />
        </Button>
      </Link>
    )
  }

  return <Avatar src={whoAmI?.avatar ?? avatar} className='mx-1' />
}

export default Account
