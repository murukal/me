import { ARTICLE } from '@/api/article'
import Article from '@/components/article'
import { query } from '@/api'
import { markdownToHtml } from '@/utils/markdown'
import { redirect } from 'next/navigation'

type Params = {
  id: string
}

const Page = async ({ params }: { params: Params }) => {
  const _response = await query(ARTICLE, {
    variables: {
      id: +params.id
    }
  }).catch(() => null)
  const article = _response?.data.article
  const html = await markdownToHtml(article?.content)

  if (!article) {
    redirect('/404')
  }

  return <Article article={article} html={html} />
}

export default Page
