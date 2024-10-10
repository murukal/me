import { ARTICLE } from '@/api/article'
import Article from '@/components/article'
import { client } from '@/api'
import { markdownToHtml } from '@/utils/markdown'

type Params = {
  id: string
}

const Page = async ({ params }: { params: Params }) => {
  const { data: { article } = {} } = await client.query({
    query: ARTICLE,
    variables: {
      id: +params.id
    }
  })

  const html = await markdownToHtml(article?.content)

  return <Article article={article!} html={html} />
}

export default Page
