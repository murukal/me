'use client'

import type { Who } from '@/api/authentication.types'
import type { Category } from '@/api/category.types'
import { useRandomAvatar } from '@/hooks/use-random-avatar'
import dayjs from 'dayjs'
import { Avatar, IconButton, Tag } from 'musae'
import { useRouter } from 'next/navigation'
import { Visibility } from 'musae/icons'

interface Props {
  id: number
  title: string
  content: string
  createdBy: Who
  createdAt: string
  categories: Category[]
}

const ArticleIntro = ({ content, title, createdBy: { avatar, nickname }, createdAt, categories, id }: Props) => {
  const _avatar = useRandomAvatar(avatar)
  const router = useRouter()

  const toArticle = () => {
    router.push(`/articles/${id}`)
  }

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateAreas: '"created cover" "title cover" "content cover" "supporting supporting"'
      }}
    >
      <div className='flex items-center gap-1' style={{ gridArea: 'created' }}>
        <Avatar src={_avatar} />
        <span className='ml-1'>{nickname}</span>
        <span>·</span>
        <span>{dayjs(createdAt).format('YYYY-MM-DD')}</span>
      </div>

      <h3 className='text-2xl mt-2.5 font-medium' style={{ gridArea: 'title' }}>
        {title}
      </h3>

      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className='text-base mt-2 line-clamp-3'
        style={{
          gridArea: 'content'
        }}
      />

      <div className='mt-8 flex items-center gap-2' style={{ gridArea: 'supporting' }}>
        {categories.map((_category) => {
          return <Tag key={_category.code}>{_category.name}</Tag>
        })}

        <div className='ml-auto'>
          <IconButton variant='text' onClick={toArticle}>
            <Visibility size={20} />
          </IconButton>
        </div>
      </div>
    </section>
  )
}

export default ArticleIntro
