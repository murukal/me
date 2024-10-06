'use client'

import Box from '@/components/box'
import CategoryCards from '@/components/category-cards'

const Categories = () => {
  return (
    <Box className='px-10'>
      <CategoryCards limit={20} />
    </Box>
  )
}

export default Categories
