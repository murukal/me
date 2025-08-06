import { query } from '@/api'
import { CATEGORIES } from '@/api/category'
import Box from '@/components/box'
import CategoryCards from '@/components/category/cards'

const PAGE = 1
const LIMIT = 20

const Page = async () => {
  const { data } = await query(CATEGORIES, {
    variables: {
      pagination: {
        page: PAGE,
        limit: LIMIT
      }
    }
  })

  return (
    <Box className='px-10'>
      <CategoryCards
        defaultCategories={data.articleCategories.items}
        defaultTotal={data.articleCategories.total}
        defaultPage={PAGE}
        limit={LIMIT}
      />
    </Box>
  )
}

export default Page
