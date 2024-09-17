import { type Article } from './article.type'

import { gql } from '@apollo/client'

export const GET_ARTICLES = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`

export type { Article }
