import { ARTICLES } from '@/api/article'
import { query } from '@/api'
import ArticleIntros from '@/components/article/intros'
import { markdownToHtml } from '@/utils/markdown'
import type { FilterArticlesBy } from '@/api/article.type'

interface Props {
  searchParams?: {
    category?: string
  }
}

const PAGE = 1
const LIMIT = 10

const Page = async ({ searchParams: { category } = {} }: Props) => {
  const filterBy: FilterArticlesBy = {
    ...(!!category && {
      categoryCodes: [category]
    })
  }

  const { data } = await query(ARTICLES, {
    variables: {
      paginateBy: {
        limit: LIMIT,
        page: PAGE
      },
      filterBy
    }
  })

  const _articles = await Promise.all(
    data.articles.items.map(async (_article) => ({
      ..._article,
      content: await markdownToHtml(_article.content)
    }))
  )

  return (
    <ArticleIntros
      defaultValue={_articles}
      defaultTotal={data.articles.total}
      defaultPage={PAGE}
      defaultLimit={LIMIT}
      filterBy={filterBy}
    />
  )
}

export default Page
