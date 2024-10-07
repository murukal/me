'use client'

import { ARTICLE } from '@/api/article'
import Box from '@/components/box'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { Skeleton, RichTextEditor, useTheme } from 'musae'
import { useParams } from 'next/navigation'
import ArticleFooter from '@/components/article-footer'

type Params = {
  id: string
}

const Article = () => {
  const { id } = useParams<Params>()
  const { loading, data: { article } = {} } = useQuery(ARTICLE, { variables: { id: +id } })
  const theme = useTheme()

  if (loading) {
    return (
      <Box>
        <Skeleton></Skeleton>
      </Box>
    )
  }

  if (!article) {
    return <Box>Article not found</Box>
  }

  return (
    <Box className='text-base p-5'>
      <h2 className='text-4xl font-bold'>{article.title}</h2>

      <p
        className='mt-5'
        style={{
          color: theme.colors.secondary
        }}
      >
        {dayjs(article.createdAt).format('MMM DD')}
      </p>

      <RichTextEditor className='mt-8' defaultValue={article.content} use='markdown' disabled />

      <ArticleFooter />
    </Box>
  )
}

export default Article
