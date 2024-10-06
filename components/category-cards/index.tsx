'use client'

import { CATEGORIES } from '@/api/category'
import { useQuery } from '@apollo/client'
import { Skeleton } from 'musae'
import CategoryCard from '../category-card'
import { clsx } from '@aiszlab/relax'

interface Props {
  limit: number
  className?: string
}

const CategoryCards = ({ limit, className }: Props) => {
  const { data: { articleCategories } = {}, loading } = useQuery(CATEGORIES, {
    variables: {
      paginateBy: {
        page: 1,
        limit
      }
    }
  })

  return (
    <div className={clsx('grid grid-cols-5 gap-8', className)}>
      {loading &&
        Array.from({ length: limit }).map((_, key) => {
          return <Skeleton className='h-52' key={key} />
        })}

      {!loading &&
        articleCategories?.items.map((category) => {
          return <CategoryCard key={category.code} label={category.name} src={category.image} />
        })}
    </div>
  )
}

export default CategoryCards