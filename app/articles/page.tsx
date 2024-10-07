import { ARTICLES } from '@/api/article'
import { client } from '@/api'
import Articles from '@/components/articles'
import { type ReadonlyURLSearchParams } from 'next/navigation'

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

  return <Articles defaultValue={data.articles.items ?? []}></Articles>
}

export default Page
