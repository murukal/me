'use client'

import LearnCoding from '@/components/learn-coding'
import styles from './styles.module.css'
import { clsx } from '@aiszlab/relax'
import { Quote, Button, useTheme, Divider } from 'musae'
import Box from '@/components/box'
import { KeyboardArrowRight, KeyboardArrowDown, Github } from 'musae/icons'
import { useFooterLinks } from './hooks'
import { useRouter } from 'next/navigation'
import ArticleCard from '@/components/article-card'
import CategoryCards from '../components/category-cards'
import { useQuery } from '@apollo/client'
import { ARTICLES } from '@/api/article'

const Home = () => {
  const theme = useTheme()
  const footerLinks = useFooterLinks()
  const router = useRouter()

  const { data: { articles: { items: articles = [] } = {} } = {} } = useQuery(ARTICLES, {})

  const toCategories = () => {
    router.push('/categories')
  }

  const toArticles = () => {
    router.push('/articles')
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
            <Button variant='text' suffix={<KeyboardArrowRight />} onClick={toCategories}>
              <span className='text-sm font-semibold'>See All Category</span>
            </Button>
          </section>

          <CategoryCards limit={5} className='mt-12' />
        </Box>
      </div>

      {/* articles */}
      <div className='px-10 mt-14'>
        <Box>
          <section className='flex justify-between items-center'>
            <h4 className='text-xl font-semibold'>Featured articles</h4>
            <Button variant='text' suffix={<KeyboardArrowRight />} onClick={toArticles}>
              <span className='text-sm font-semibold'>See All Articles</span>
            </Button>
          </section>

          <div className='grid grid-cols-5 gap-8 mt-12'>
            {articles.map((article) => {
              return (
                <ArticleCard
                  id={article.id}
                  key={article.id}
                  title={article.title}
                  avatar={article.createdBy.avatar}
                  createdAt={article.createdAt}
                  username={article.createdBy.username}
                />
              )
            })}
          </div>
        </Box>
      </div>

      {/* footer */}
      <div className='px-10 pb-6 pt-14'>
        <Box className='flex justify-between gap-20'>
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
          <div className={clsx('flex gap-20', styles['links'])}>
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
                            target='_blank'
                            rel='noreferrer'
                            style={{
                              color: theme.colors.secondary
                            }}
                            {...(!!link.href && {
                              href: link.href
                            })}
                            {...(!link.href && {
                              href: '#',
                              onClick: (e) => e.preventDefault()
                            })}
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
