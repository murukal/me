'use client'

import type { Article } from '@/api/article.type'
import Box from '../box'
import { useInfiniteScroll, useMounted } from '@aiszlab/relax'
import ArticleIntro from '../article-intro'
import { Divider } from 'musae'
import { useLazyQuery } from '@apollo/client'
import { ARTICLES } from '@/api/article'
import { useState } from 'react'

interface Props {
  defaultValue: Article[]
  defaultTotal: number
  defaultPage?: number
  defaultLimit?: number
}

const Articles = ({ defaultValue, defaultTotal, defaultPage = 1, defaultLimit = 10 }: Props) => {
  const [page, setPage] = useState(defaultPage + 1)
  const [, { data: { articles: { items = defaultValue, total = 0 } = {} } = {}, fetchMore, client }] =
    useLazyQuery(ARTICLES)

  useMounted(() => {
    client.writeQuery({
      query: ARTICLES,
      variables: {
        paginateBy: {
          page: defaultPage,
          limit: defaultLimit
        }
      },
      data: {
        articles: {
          items: defaultValue,
          total: defaultTotal
        }
      }
    })
  })

  useInfiniteScroll<HTMLDivElement>({
    hasMore: items.length >= total,
    onLoadMore: () => {
      fetchMore({
        variables: {
          paginateBy: {
            page: page,
            limit: 10
          }
        }
      })
      setPage((_page) => _page + 1)
    }
  })

  return (
    <Box className='p-5'>
      {items.map((_article) => {
        return [
          <ArticleIntro
            content={_article.content}
            title={_article.title}
            id={_article.id}
            key={_article.id}
            createdBy={_article.createdBy}
            createdAt={_article.createdAt}
            categories={_article.categories}
          />,
          <Divider key={`${_article.id}-separator`} margin={[40, 24]} />
        ]
      })}

      {/* <div ref={sentinelRef} /> */}
    </Box>
  )
}

export default Articles
