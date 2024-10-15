'use client'

import type { Article as ArticleType } from '@/api/article.type'
import Box from '../box'
import { useTheme } from 'musae'
import dayjs from 'dayjs'
import ArticleFooter from './footer'
import { lazy, Suspense } from 'react'

interface Props {
  article: ArticleType
  html: string
}

const RichTextEditor = lazy(() => import('musae').then(({ RichTextEditor }) => ({ default: RichTextEditor })))

const Article = ({ article, html }: Props) => {
  const theme = useTheme()

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

      <Suspense fallback={<div dangerouslySetInnerHTML={{ __html: html }} />}>
        <RichTextEditor className='mt-8' defaultValue={article.content} use='markdown' disabled />
      </Suspense>

      <ArticleFooter />
    </Box>
  )
}

export default Article
