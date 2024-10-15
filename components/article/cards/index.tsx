'use client'

import { ARTICLES } from '@/api/article'
import { useQuery } from '@apollo/client'
import ArticleCard from '../card'
import { Skeleton } from 'musae'

const ArticleCards = () => {
  const {
    data: { articles: { items: articles = [] } = {} } = {},
    loading,
    called
  } = useQuery(ARTICLES, {
    variables: {
      paginateBy: {
        page: 1,
        limit: 5
      }
    }
  })

  const isLoading = !called || loading

  return (
    <div className='grid grid-cols-5 gap-8 mt-12'>
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => {
          return <Skeleton className='h-96' key={index} />
        })}

      {!isLoading &&
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
