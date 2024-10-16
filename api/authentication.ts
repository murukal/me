import { gql, TypedDocumentNode } from '@apollo/client'
import type { Who } from './authentication.type'

export const WHO_AM_I: TypedDocumentNode<{ whoAmI: Who }> = gql`
  query WhoAmI {
    whoAmI {
      id
      nickname
      avatar
    }
  }
`
