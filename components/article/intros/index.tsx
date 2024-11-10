'use client'

import type { Article, FilterArticlesBy } from '@/api/article.type'
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
  filterBy?: FilterArticlesBy
}

const ArticleIntros = ({ defaultValue, defaultTotal, defaultPage = 1, defaultLimit = 10, filterBy }: Props) => {
  const [page, setPage] = useState(defaultPage + 1)
  const [, { data: { articles: { items = defaultValue, total = 0 } = {} } = {}, fetchMore, client }] = useLazyQuery(
    ARTICLES,
    { variables: { filterBy } }
  )

  useMounted(() => {
    client.writeQuery({
      query: ARTICLES,
      variables: {
        paginateBy: {
          page: defaultPage,
          limit: defaultLimit
        },
        filterBy
      },
      data: {
        articles: {
          items: defaultValue,
          total: defaultTotal
        }
      }
    })
  })

  const [sentinelRef] = useInfiniteScroll<HTMLDivElement>({
    hasMore: items.length < total,
    onLoadMore: () => {
      fetchMore({
        variables: {
          paginateBy: {
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
