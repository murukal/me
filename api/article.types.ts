import type { Who } from './authentication.types'
import type { Category } from './category.types'

export interface Article {
  id: number
  title: string
  content: string
  createdAt: string
  createdBy: Who
  categories: Category[]
}

export interface FilterArticlesInput {
  categoryCodes?: string[]
}
