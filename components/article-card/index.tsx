import { Avatar } from 'musae'
import Image from 'next/image'

const ArticleCard = () => {
  return (
    <div className='rounded-md p-4 flex flex-col hover:shadow-md'>
      <Image src='https://picsum.photos/200/300' alt='example' />

      <h5 className='font-bold mt-4'>How to make GUI in Java with example example</h5>

      <section
        className='grid mt-10'
        style={{
          gridTemplateAreas: '"avatar author" "avatar supporting"'
        }}
      >
        <Avatar
          alt='JACK'
          size='large'
          style={{
            gridArea: 'avatar'
          }}
        />

        <h6 style={{ gridArea: 'author' }}>JACK</h6>
        <span style={{ gridArea: 'supporting' }}>12321321321</span>
      </section>
    </div>
  )
}

export default ArticleCard
