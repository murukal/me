import type { FilterArticlesInput, Article } from './article.types'
import { gql, type TypedDocumentNode } from '@apollo/client'
import type { Pagination, Paginated } from './pagination.types'

export const ARTICLES: TypedDocumentNode<
  { articles: Paginated<Article> },
  {
    pagination?: Pagination
    filter?: FilterArticlesInput
  }
> = gql`
  query Articles($pagination: Pagination, $filter: FilterArticlesInput) {
    articles(filter: $filter, pagination: $pagination) {
      items {
        id
        title
        content
        createdAt
        createdBy {
          id
          nickname
          avatar
        }
        categories {
          code
          name
        }
      }
      total
    }
  }
`

/**
 * @description
 * 根据id查询文章
 */
export const ARTICLE: TypedDocumentNode<
  {
    article: Article
  },
  {
    id: number
  }
> = gql`
  query Article($id: Int!) {
    article(id: $id) {
      title
      content
      categories {
        code
        name
      }
    }
  }
`
