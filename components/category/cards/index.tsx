'use client'

import { CATEGORIES } from '@/api/category'
import { useLazyQuery } from '@apollo/client'
import CategoryCard from '../card'
import { useMounted } from '@aiszlab/relax'
import { stringify } from '@aiszlab/relax/class-name'
import type { Category } from '@/api/category.type'
import { Skeleton } from 'musae'
import { useInfiniteScroll } from '@aiszlab/relax'
import { useState } from 'react'

interface Props {
  defaultCategories?: Category[]
  defaultTotal?: number
  defaultPage?: number
  limit: number
  className?: string
  lazy?: boolean
  more?: boolean
}

const CategoryCards = ({
  defaultCategories = [],
  limit,
  defaultPage = 1,
  defaultTotal = 0,
  className,
  lazy = false,
  more = false
}: Props) => {
  const [
    queryCategories,
    {
      data: { articleCategories: { items = defaultCategories, total = defaultTotal } = {} } = {},
      loading,
      called,
      fetchMore,
      client
    }
  ] = useLazyQuery(CATEGORIES)
  const [page, setPage] = useState(defaultPage)

  // 默认缓存设置
  useMounted(() => {
    client.writeQuery({
      query: CATEGORIES,
      variables: {
        paginateBy: {
          page: defaultPage,
          limit
        }
      },
      data: {
        articleCategories: {
          items: defaultCategories,
          total: defaultTotal
        }
      }
    })
  })

  useMounted(async () => {
    if (!lazy) return

    await queryCategories({
      variables: {
        paginateBy: {
          page: defaultPage,
          limit
        }
      },
      fetchPolicy: 'cache-and-network'
    }).catch(() => null)
  })

  const [] = useInfiniteScroll({
    hasMore: more && items.length < total,
    onLoadMore: () => {
      fetchMore({
        variables: {
          paginateBy: {
            page,
            limit
          }
        }
      }).catch(() => null)

      setPage((_page) => _page + 1)
    }
  })

  return (
    <div
      className={stringify(
        'pb-8',
        'grid gap-8',
        'xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1',
        className
      )}
    >
      {items.map((category) => {
        return <CategoryCard key={category.code} code={category.code} label={category.name} src={category.image} />
      })}

      {(loading || (lazy && !called)) &&
        Array.from({ length: limit }).map((_, key) => {
          return <Skeleton className='h-52' key={key} />
        })}
    </div>
  )
}

export default CategoryCards
