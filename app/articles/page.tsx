'use client'

import { ARTICLES } from '@/api/article'
import ArticleIntro from '@/components/article-intro'
import Box from '@/components/box'
import { useQuery } from '@apollo/client'
import { Divider, Skeleton } from 'musae'
import styles from './styles.module.css'
import { clsx } from '@aiszlab/relax'

const Articles = () => {
  const { data: { articles: { items = [] } = {} } = {}, loading } = useQuery(ARTICLES, {
    variables: {
      paginateBy: {
        page: 1,
        limit: 10
      }
    }
  })

  if (loading) {
    return (
      <Box className='p-5 flex flex-col gap-5'>
        {Array.from({ length: 10 }).map((_, row) => {
          return <Skeleton key={row} className='h-44 rounded' />
        })}
      </Box>
    )
  }

  return (
    <Box className={clsx('p-5', styles.articles)}>
      {items.map((_article) => {
        return [
          <ArticleIntro
            content={_article.content}
            title={_article.title}
            key={_article.id}
            createdBy={_article.createdBy}
            createdAt={_article.createdAt}
            categories={_article.categories}
          />,
          <Divider key={`${_article.id}-separator`} className={styles.separator} margin={[40, 24]} />
        ]
      })}
    </Box>
  )
}

export default Articles
