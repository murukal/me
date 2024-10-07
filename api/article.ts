import type { FilterArticlesBy, Article } from './article.type'
import { gql, type TypedDocumentNode } from '@apollo/client'
import type { PaginateBy, Paginated } from './pagination.type'

export const ARTICLES: TypedDocumentNode<
  { articles: Paginated<Article> },
  {
    paginateBy?: PaginateBy
    filterBy?: FilterArticlesBy
  }
> = gql`
  query Articles($paginateBy: PaginateBy, $filterBy: FilterArticlesBy) {
    articles(filterBy: $filterBy, paginateBy: $paginateBy) {
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
        categories {
          code
          name
        }
      }
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
