import { WHO_AM_I } from '@/api/authentication'
import { useRandomAvatar } from '@/hooks/use-random-avatar'
import { useQuery } from '@apollo/client'
import { Avatar, Button, Skeleton } from 'musae'
import { AccountCircle } from 'musae/icons'
import Link from 'next/link'

const Account = () => {
  const { data: { whoAmI } = {}, loading } = useQuery(WHO_AM_I)
  const avatar = useRandomAvatar()

  if (loading) {
    return <Skeleton className='w-4 h-4 rounded-full mx-3' />
  }

  if (!whoAmI) {
    return (
      <Link href="https://admin.fantufantu.com/sign-up">
        <Button shape='circular' variant='text'>
          <AccountCircle size={16} />
        </Button>
      </Link>
    )
  }

  return <Avatar src={whoAmI.avatar ?? avatar} size='small' />
}

export default Account
