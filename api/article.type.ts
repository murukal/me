import type { Who } from './authentication.type'
import type { Category } from './category.type'
import type { PaginateBy } from './pagination.type'

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
