import { Avatar } from 'musae'

const ArticleCard = () => {
  return (
    <div className='rounded-md p-4 flex flex-col hover:shadow-md'>
      <img src='' alt='' />

      <h5 className='font-bold mt-4'>How to make GUI in Java with example example</h5>

      <div
        className='grid mt-10'
        style={{
          gridTemplateAreas: '"avatar author" "avatar extra"'
        }}
      >
        {/* TODO: use grid area */}
        <Avatar alt='JACK' size='large' />

        <h6 style={{ gridArea: 'author' }}>JACK</h6>
        <span style={{ gridArea: 'extra' }}>12321321321</span>
      </div>
    </div>
  )
}

export default ArticleCard
