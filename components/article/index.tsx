'use client'

import type { Article as ArticleType } from '@/api/article.type'
import Box from '../box'
import { useTheme, Markdown } from 'musae'
import dayjs from 'dayjs'
import ArticleFooter from './footer'

interface Props {
  article: ArticleType
  html: string
}

const Article = ({ article }: Props) => {
  const theme = useTheme()

  return (
    <Box className='text-base p-5'>
      <h2 className='text-4xl font-bold'>{article.title}</h2>

      <p
        className='mt-5 mb-8'
        style={{
          color: theme.colors.secondary
        }}
      >
        {dayjs(article.createdAt).format('MMM DD')}
      </p>

      <Markdown value={article.content} />

      <ArticleFooter />
    </Box>
  )
}

export default Article
