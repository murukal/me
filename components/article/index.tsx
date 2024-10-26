'use client'

import type { Article as ArticleType } from '@/api/article.type'
import Box from '../box'
import { Skeleton, useTheme, VisuallyHidden } from 'musae'
import dayjs from 'dayjs'
import ArticleFooter from './footer'
import dynamic from 'next/dynamic'

interface Props {
  article: ArticleType
  html: string
}

const Article = ({ article, html }: Props) => {
  const theme = useTheme()

  const RichTextEditor = dynamic(() => import('musae').then(({ RichTextEditor }) => RichTextEditor), {
    ssr: false,
    loading: () => {
      return (
        <Skeleton className='h-80 rounded-lg'>
          <VisuallyHidden dangerouslySetInnerHTML={{ __html: html }} />
        </Skeleton>
      )
    }
  })

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

      <RichTextEditor defaultValue={article.content} use='markdown' disabled />

      <ArticleFooter />
    </Box>
  )
}

export default Article
