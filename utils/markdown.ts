import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

/**
 * @description
 * 将 Markdown 转换为 HTML
 */
export const markdownToHtml = async (markdown?: string) => {
  if (!markdown) return ''

  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown)
    .then((_markdown) => String(_markdown))

  return html
}
