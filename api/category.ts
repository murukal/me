import { gql, TypedDocumentNode } from '@apollo/client'
import type { Category, FilterCategoriesBy } from './category.types'
import type { PaginateBy, Paginated } from './pagination.types'

/**
 * @description
 * 查询分类列表
 */
export const CATEGORIES: TypedDocumentNode<
  { articleCategories: Paginated<Category> },
  {
    filterBy?: FilterCategoriesBy
    paginateBy?: PaginateBy
  }
> = gql`
  query Categories($filterBy: FilterArticleCategoriesBy, $paginateBy: PaginateBy) {
    articleCategories(filterBy: $filterBy, paginateBy: $paginateBy) {
      items {
        code
        name
        image
      }
      total
    }
  }
`
