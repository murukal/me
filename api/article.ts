import { type Article } from './article.type'
import { gql, type TypedDocumentNode } from '@apollo/client'
import type { PaginateBy, Paginated } from './pagination.type'

export const ARTICLES: TypedDocumentNode<
  { articles: Paginated<Article> },
  {
    paginateBy?: PaginateBy
  }
> = gql`
  query Articles($paginateBy: PaginateBy) {
    articles(filterBy: {}, paginateBy: $paginateBy) {
      items {
        id
        title
        content
        createdAt
        createdBy {
          id
          username
          avatar
        }
      }
    }
  }
`
