import { gql, TypedDocumentNode } from '@apollo/client'
import type { Category, FilterArticleCategoriesInput } from './category.types'
import type { Pagination, Paginated } from './pagination.types'

/**
 * @description
 * 查询分类列表
 */
export const CATEGORIES: TypedDocumentNode<
  { articleCategories: Paginated<Category> },
  {
    filter?: FilterArticleCategoriesInput
    pagination?: Pagination
  }
> = gql`
  query Categories($filter: FilterArticleCategoriesInput, $pagination: Pagination) {
    articleCategories(filter: $filter, pagination: $pagination) {
      items {
        code
        name
        image
      }
      total
    }
  }
`
