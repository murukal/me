import { ARTICLES } from '@/api/article'
import { client } from '@/api'
import Articles from '@/components/articles'
import { markdownToHtml } from '@/utils/markdown'

interface Props {
  searchParams?: {
    category?: string
  }
}

const Page = async ({ searchParams: { category } = {} }: Props) => {
  const { data } = await client.query({
    query: ARTICLES,
    variables: {
      paginateBy: {
        limit: 10,
        page: 1
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

  return <Articles defaultValue={_articles} />
}

export default Page
