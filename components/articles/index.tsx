/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import type { Article } from '@/api/article.type'
import Box from '../box'
import { useInfiniteScroll } from '@aiszlab/relax'
import ArticleIntro from '../article-intro'
import { Divider } from 'musae'
import { useLazyQuery } from '@apollo/client'
import { ARTICLES } from '@/api/article'
import { useMemo, useState } from 'react'

interface Props {
  defaultValue: Article[]
}

const Articles = ({ defaultValue }: Props) => {
  const [page, setPage] = useState(2)
  const [refetch, { data: { articles: { items = [], total = 0 } = {} } = {}, fetchMore }] = useLazyQuery(ARTICLES)

  const articles = useMemo(() => {
    return [...defaultValue, ...items]
  }, [defaultValue, items])

  const [sentinelRef] = useInfiniteScroll<HTMLDivElement>({
    hasMore: articles.length >= total,
    onLoadMore: () => {
      setPage(page + 1)

      // 第二次及以后使用 fetchMore 作为合并请求
      const _refetch = page === 2 ? refetch : fetchMore

      _refetch({
        variables: {
          paginateBy: {
            page: page,
            limit: 10
          }
        }
      })
    }
  })

  return (
    <Box className='p-5'>
      {articles.map((_article) => {
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

      {/* @ts-expect-error */}
      <div ref={sentinelRef} />
    </Box>
  )
}

export default Articles
