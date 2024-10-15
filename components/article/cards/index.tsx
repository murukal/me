'use client'

import { ARTICLES } from '@/api/article'
import { useQuery } from '@apollo/client'
import ArticleCard from '../card'
import { Skeleton } from 'musae'
import { clsx } from '@aiszlab/relax'

interface Props {
  className?: string
}

const LIMIT = 4

const ArticleCards = ({ className }: Props) => {
  const { data: { articles: { items: articles = [] } = {} } = {}, loading } = useQuery(ARTICLES, {
    variables: {
      paginateBy: {
        page: 1,
        limit: LIMIT
      }
    }
  })

  return (
    <div className={clsx('grid gap-8 mt-12', 'lg:grid-cols-4 sm:grid-cols-2 grid-cols-1', className)}>
      {loading &&
        Array.from({ length: LIMIT }).map((_, index) => {
          return <Skeleton className='h-80' key={index} />
        })}

      {!loading &&
        articles.map((article) => {
          return (
            <ArticleCard
              id={article.id}
              key={article.id}
              title={article.title}
              createdAt={article.createdAt}
              createdBy={article.createdBy}
            />
          )
        })}
    </div>
  )
}

export default ArticleCards
