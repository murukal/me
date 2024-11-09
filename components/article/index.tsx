'use client'

import type { Article as ArticleType } from '@/api/article.type'
import Box from '../box'
import { Skeleton, useTheme, VisuallyHidden } from 'musae'
import dayjs from 'dayjs'
import ArticleFooter from './footer'
import dynamic from 'next/dynamic'
import { useDefault } from '@aiszlab/relax'

interface Props {
  article: ArticleType
  html: string
}

const Article = ({ article, html }: Props) => {
  const theme = useTheme()

  const loading = useDefault(() => {
    return (
      <Skeleton className='h-[800px] rounded-lg'>
        <VisuallyHidden dangerouslySetInnerHTML={{ __html: html }} />
      </Skeleton>
    )
  })

  const RichTextEditor = useDefault(() => {
    return dynamic(() => import('musae').then(({ RichTextEditor }) => RichTextEditor), {
      ssr: false,
      loading: () => loading
    })
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

      <RichTextEditor defaultValue={article.content} use='markdown' disabled fallback={loading} />

      <ArticleFooter />
    </Box>
  )
}

export default Article
