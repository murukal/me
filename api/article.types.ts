import type { Who } from './authentication.types'
import type { Category } from './category.types'
import type { PaginateBy } from './pagination.types'

export interface Article {
  id: number
  title: string
  content: string
  createdAt: string
  createdBy: Who
  categories: Category[]
}

export interface FilterArticlesBy {
  categoryCodes?: string[]
}

export interface QueryArticlesBy {
  paginateBy?: PaginateBy
  filterBy?: FilterArticlesBy
}
