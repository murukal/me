'use client'

import type { Article } from '@/api/article.type'
import Box from '../box'
import { useInfiniteScroll } from '@aiszlab/relax'
import ArticleIntro from '../article-intro'
import { Divider } from 'musae'
import { useLazyQuery } from '@apollo/client'
import { ARTICLES } from '@/api/article'
import { useEffect } from 'react'

interface Props {
  defaultValue: Article[]
}

const Articles = ({ defaultValue }: Props) => {
  // const [page, setPage] = useState(1)
  const [, { data: { articles: { items } = { items: [] } } = {}, fetchMore }] = useLazyQuery(ARTICLES, {
    ssr: false
  })

  const [sentinelRef] = useInfiniteScroll<HTMLDivElement>({
    hasMore: true,
    onLoadMore: () => {
      console.log('11111')
    }
  })

  useEffect(() => {
    fetchMore({
      variables: {
        paginateBy: {
          page: 2,
          limit: 10
        }
      }
    }).then(() => {
      console.log('11111')
    })
  }, [])

  return (
    <Box className='p-5'>
      {defaultValue.map((_article) => {
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

      {items.map((_item) => {
        return <span key={_item.id}>1</span>
      })}

      <div ref={sentinelRef}>12321321</div>
    </Box>
  )
}

export default Articles
