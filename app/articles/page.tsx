import { ARTICLES } from '@/api/article'
import { query } from '@/api'
import Articles from '@/components/articles'
import { markdownToHtml } from '@/utils/markdown'

interface Props {
  searchParams?: {
    category?: string
  }
}

const PAGE = 1
const LIMIT = 10

const Page = async ({ searchParams: { category } = {} }: Props) => {
  const { data } = await query(ARTICLES, {
    variables: {
      paginateBy: {
        limit: LIMIT,
        page: PAGE
      },
      filterBy: {
        ...(!!category && {
          categoryCodes: [category]
        })
      }
    }
  })

  const _articles = await Promise.all(
    data.articles.items.map(async (_article) => ({
      ..._article,
      content: await markdownToHtml(_article.content)
    }))
  )

  return (
    <Articles defaultValue={_articles} defaultTotal={data.articles.total} defaultPage={PAGE} defaultLimit={LIMIT} />
  )
}

export default Page
