import { KeyboardArrowRight } from 'musae/icons'
import Link from 'next/link'

const ArticleFooter = () => {
  return (
    <div className='my-8 flex items-center gap-1'>
      <KeyboardArrowRight />
      <Link href='/articles'>cd ..</Link>
    </div>
  )
}

export default ArticleFooter
