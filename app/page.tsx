'use client'

import LearnCoding from '@/components/learn-coding'
import styles from './styles.module.css'
import { clsx } from '@aiszlab/relax'
import { Quote, Button, useTheme, Divider } from 'musae'
import Box from '@/components/box'
import { KeyboardArrowRight, KeyboardArrowDown, Github } from 'musae/icons'
import { useCategories, useFooterLinks } from './hooks'
import { createElement } from 'react'
import { useRouter } from 'next/navigation'
import CategoryCard from '@/components/category-card'
import ArticleCard from '@/components/article-card'

const Home = () => {
  const { categories } = useCategories()
  const theme = useTheme()
  const footerLinks = useFooterLinks({ categories })
  const router = useRouter()

  const toCategory = () => {
    router.push('/category')
  }

  return (
    <div className='pb-10'>
      <div className='px-10'>
        <Box className='grid gap-10 grid-cols-2 items-center'>
          <section className='w-fit'>
            <h3 className='text-5xl tracking-wide font-bold'>Hi, I&rsquo;m tutu</h3>
            <h3 className='text-5xl tracking-wide font-bold'>Front End Dev</h3>
            <Quote className='mt-5'>On this blog I share tips and tricks, frameworks, projects, tutorials, etc</Quote>
            <Quote>Make sure you subscribe to get the latest updates</Quote>
          </section>

          <div className={clsx('w-full justify-self-center', styles.selfie)}>
            <LearnCoding />
          </div>
        </Box>
      </div>

      <div className='mt-52 flex justify-center'>
        <KeyboardArrowDown size={24} className='cursor-pointer select-none' />
      </div>

      {/* categories */}
      <div className='px-10 mt-14'>
        <Box>
          <section className='flex justify-between items-center'>
            <h4 className='text-xl font-semibold'>Browse the category</h4>
            <Button variant='text' suffix={<KeyboardArrowRight />} onClick={toCategory}>
              <span className='text-sm font-semibold'>See All Category</span>
            </Button>
          </section>

          <div className='grid grid-cols-5 gap-8 mt-12'>
            {categories.map((category) => {
              return (
                <CategoryCard key={category.label} label={category.label}>
                  {createElement(category.logo)}
                </CategoryCard>
              )
            })}
          </div>
        </Box>
      </div>

      {/* articles */}
      <div className='px-10'>
        <ArticleCard />
      </div>

      {/* footer */}
      <div className='px-10 pb-6 pt-14'>
        <Box className='flex justify-between'>
          <section className='flex flex-col gap-5'>
            <h4 className='text-3xl font-semibold'>
              tutu
              <span className='text-lg font-bold' style={{ color: theme.colors['primary'] }}>
                .me
              </span>
            </h4>

            <span className='text-base'>Digitaldastin by tutu</span>

            <div className='flex gap-7 items-center'>
              <Github size={30} />
            </div>
          </section>

          {/* links */}
          <div className={clsx('flex gap-24', styles['links'])}>
            {footerLinks.map(({ links, title }) => {
              return (
                <section key={title}>
                  <h6 className='uppercase font-bold'>{title}</h6>
                  <ul className='mt-6 flex flex-col gap-5'>
                    {links.map((link) => {
                      return (
                        <li key={link.label} className='cursor-pointer select-none' onClick={link.onClick}>
                          <a
                            className='text-lg'
                            href='#'
                            style={{
                              color: theme.colors.secondary
                            }}
                            onClick={(e) => e.preventDefault()}
                          >
                            {link.label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </div>
        </Box>

        <Divider className='max-w-screen-2xl mx-auto' orientation='horizontal' margin={[50, 26]} />

        <Box
          className='flex justify-between text-sm'
          style={{
            color: theme.colors.secondary
          }}
        >
          <span>© 2024 fantufantu</span>
          <span>Made With ❤️ tutu & fanfan</span>
        </Box>
      </div>
    </div>
  )
}

export default Home
