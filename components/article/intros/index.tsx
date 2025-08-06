'use client'

import type { Article, FilterArticlesInput } from '@/api/article.types'
import Box from '../../box'
import { useInfiniteScroll, useMounted } from '@aiszlab/relax'
import ArticleIntro from '../intro'
import { Divider } from 'musae'
import { useLazyQuery } from '@apollo/client'
import { ARTICLES } from '@/api/article'
import { useState } from 'react'

interface Props {
  defaultValue: Article[]
  defaultTotal: number
  defaultPage?: number
  defaultLimit?: number
  filter?: FilterArticlesInput
}

const ArticleIntros = ({ defaultValue, defaultTotal, defaultPage = 1, defaultLimit = 10, filter }: Props) => {
  const [page, setPage] = useState(defaultPage + 1)
  const [, { data: { articles: { items = defaultValue, total = 0 } = {} } = {}, fetchMore, client }] = useLazyQuery(
    ARTICLES,
    { variables: { filter } }
  )

  useMounted(() => {
    client.writeQuery({
      query: ARTICLES,
      variables: {
        pagination: {
          page: defaultPage,
          limit: defaultLimit
        },
        filter
      },
      data: {
        articles: {
          items: defaultValue,
          total: defaultTotal
        }
      }
    })
  })

  const { sentinelRef } = useInfiniteScroll<HTMLDivElement>({
    hasMore: items.length < total,
    onLoadMore: () => {
      fetchMore({
        variables: {
          pagination: {
            page: page,
            limit: defaultLimit
          }
        }
      }).catch(() => null)
      setPage((_page) => _page + 1)
    }
  })

  return (
    <Box className='p-5'>
      {items.map((_article, index) => {
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
          index !== items.length - 1 && <Divider key={`${_article.id}-separator`} margin={[40, 24]} />
        ]
      })}

      <div ref={sentinelRef} />
    </Box>
  )
}

export default ArticleIntros
