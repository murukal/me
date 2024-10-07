import type { Who } from './authentication.type'
import type { Category } from './category.type'

export interface Article {
  id: number
  title: string
  content: string
  createdAt: string
  createdBy: Who
  categories: Category[]
}
