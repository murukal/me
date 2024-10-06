import { Avatar, Image } from 'musae'
import dayjs from 'dayjs'
import { useState } from 'react'
import { random } from '@aiszlab/fuzzy/avatar'
import { useMounted } from '@aiszlab/relax'

interface Props {
  title: string
  avatar?: string | null
  username: string
  createdAt: string
}

const ArticleCard = ({ avatar: _avatar, title, username, createdAt }: Props) => {
  const [avatar, setAvatar] = useState(_avatar ?? '')

  useMounted(async () => {
    if (avatar) return
    setAvatar(await random())
  })

  return (
    <div className='rounded-lg flex flex-col hover:shadow-lg cursor-pointer transition-all overflow-hidden'>
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
