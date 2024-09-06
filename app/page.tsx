import LearnCoding from '@/components/learn-coding'

const Home = () => {
  return (
    <div>
      <div className='px-10'>
        <div className='max-w-screen-2xl mx-auto grid gap-10 grid-cols-2 justify-items-center items-center'>
          <section className='w-fit'>
            <h3>Hi, I`m tutu</h3>
            <h3>Front End Dev</h3>
          </section>
          <div
            // className='grid'
            style={{
              width: 470,
              maxWidth: 'fit-content'
              // maxWidth: 470
              // gridTemplateColumns: 'fit-content(470px)'
            }}
          >
            <LearnCoding />
          </div>
        </div>
      </div>

      {/* categories */}
      <div></div>
    </div>
  )
}

export default Home
