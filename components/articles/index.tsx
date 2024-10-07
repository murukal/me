'use client'

import type { Article } from '@/api/article.type'
import Box from '../box'
import { clsx } from '@aiszlab/relax'
import styles from './styles.module.css'
import ArticleIntro from '../article-intro'
import { Divider } from 'musae'

interface Props {
  defaultValue: Article[]
}

const Articles = ({ defaultValue }: Props) => {
  return (
    <Box className={clsx('p-5', styles.articles)}>
      {defaultValue.map((_article) => {
        return [
          <ArticleIntro
            content={_article.content}
            title={_article.title}
            key={_article.id}
            createdBy={_article.createdBy}
            createdAt={_article.createdAt}
            categories={_article.categories}
          />,
          <Divider key={`${_article.id}-separator`} className={styles.separator} margin={[40, 24]} />
        ]
      })}
    </Box>
  )
}

export default Articles
