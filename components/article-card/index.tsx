import { Avatar, Image } from 'musae'
import dayjs from 'dayjs'

interface Props {
  title: string
  avatar: string
  username: string
  createdAt: number
}

const ArticleCard = ({ avatar, title, username, createdAt }: Props) => {
  return (
    <div className='rounded-lg flex flex-col hover:shadow-lg cursor-pointer p-4'>
      <Image src='https://picsum.photos/200/300' className='rounded-t-md' alt='example' height={60} width='100%' />

      <h5 className='font-bold mt-4'>{title}</h5>

      <section
        className='grid items-center'
        style={{
          gridTemplateAreas: '"avatar author" "avatar supporting"'
        }}
      >
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
