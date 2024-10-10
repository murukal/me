import { ARTICLE } from '@/api/article'
import Article from '@/components/article'
import { client } from '@/api'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

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

  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(article?.content)
    .then((markdown) => String(markdown ?? ''))

  return <Article article={article!} html={html} />
}

export default Page
