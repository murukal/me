'use client'

import { CATEGORIES } from '@/api/category'
import { useLazyQuery } from '@apollo/client'
import CategoryCard from '../category-card'
import { clsx, useMounted } from '@aiszlab/relax'
import type { Category } from '@/api/category.type'
import { Skeleton } from 'musae'

interface Props {
  defaultValue?: Category[]
  defaultTotal?: number
  defaultPage?: number
  limit: number
  className?: string
  refetch?: boolean
}

const CategoryCards = ({
  defaultValue = [],
  limit,
  defaultPage = 1,
  defaultTotal = 0,
  className,
  refetch: _refetch
}: Props) => {
  const [refetch, { data: { articleCategories: { items = defaultValue, total = defaultTotal } = {} } = {}, loading }] =
    useLazyQuery(CATEGORIES)

  console.log('total====', total)
  console.log(limit)
  console.log(defaultPage)

  console.log('loading====', loading)

  useMounted(() => {
    if (!_refetch) return

    refetch({
      variables: {
        paginateBy: {
          page: defaultPage,
          limit
        }
      }
    })
  })

  return (
    <div
      className={clsx(
        'grid gap-8',
        'xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1',
        className
      )}
    >
      {items.map((category) => {
        return <CategoryCard key={category.code} code={category.code} label={category.name} src={category.image} />
      })}

      {loading &&
        Array.from({ length: limit }).map((_, key) => {
          return <Skeleton className='h-52' key={key} />
        })}
    </div>
  )
}

export default CategoryCards
