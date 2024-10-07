'use client'

import { Avatar, Image } from 'musae'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useRandomAvatar } from '@/hooks/use-random-avatar'

interface Props {
  title: string
  avatar?: string | null
  username: string
  createdAt: string
  id: number
}

const ArticleCard = ({ avatar: _avatar, title, username, createdAt, id }: Props) => {
  const router = useRouter()
  const avatar = useRandomAvatar(_avatar)

  const toArticle = () => {
    router.push(`/articles/${id}`)
  }

  return (
    <div
      className='rounded-lg flex flex-col hover:shadow-lg cursor-pointer transition-all overflow-hidden'
      onClick={toArticle}
    >
      <Image
        src='https://picsum.photos/200/300'
        className='rounded-t-md'
        alt={title}
        height={200}
        width='300'
        previewable={false}
      />

      <section
        className='grid items-center p-4'
        style={{
          gridTemplateAreas: '"title title" "avatar author" "avatar supporting"'
        }}
      >
        <h5
          className='font-bold mb-4'
          style={{
            gridArea: 'title'
          }}
        >
          {title}
        </h5>

        <Avatar
          alt='JACK'
          size='large'
          src={avatar}
          style={{
            gridArea: 'avatar'
          }}
        />

        <h6 className='text-xs font-semibold' style={{ gridArea: 'author' }}>
          {username}
        </h6>

        <span className='text-xs' style={{ gridArea: 'supporting' }}>
          {dayjs(createdAt).format('YYYY-MM-DD')}
        </span>
      </section>
    </div>
  )
}

export default ArticleCard
