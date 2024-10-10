'use client'

import { Avatar, Image } from 'musae'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useRandomAvatar } from '@/hooks/use-random-avatar'
import type { Who } from '@/api/authentication.type'

interface Props {
  title: string
  createdAt: string
  id: number
  createdBy: Who
}

const ArticleCard = ({ title, createdAt, id, createdBy }: Props) => {
  const router = useRouter()
  const avatar = useRandomAvatar(createdBy.avatar)

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
          alt={createdBy.nickname}
          size='large'
          src={avatar}
          style={{
            gridArea: 'avatar'
          }}
        />

        <h6 className='text-xs font-semibold' style={{ gridArea: 'author' }}>
          {createdBy.nickname}
        </h6>

        <span className='text-xs' style={{ gridArea: 'supporting' }}>
          {dayjs(createdAt).format('YYYY-MM-DD')}
        </span>
      </section>
    </div>
  )
}

export default ArticleCard
