import { ARTICLES } from '@/api/article'
import { client } from '@/api'
import Articles from '@/components/articles'

const Page = async () => {
  const { data } = await client.query({
    query: ARTICLES,
    variables: {
      paginateBy: {
        limit: 10,
        page: 1
      }
    }
  })

  return <Articles defaultValue={data.articles.items ?? []}></Articles>
}

export default Page
