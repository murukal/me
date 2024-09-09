'use client'

import * as categories from '@/components/stack-logos'
import CategoryCard from '@/components/category-card'
import { createElement } from 'react'
import Box from '@/components/box'

const Category = () => {
  return (
    <Box className='px-10 grid grid-cols-5 gap-5'>
      {Object.entries(categories).map(([key, render]) => {
        return (
          <CategoryCard key={key} label={key}>
            {createElement(render)}
          </CategoryCard>
        )
      })}
    </Box>
  )
}

export default Category
