import { ApolloClient, type FieldFunctionOptions, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import type { Article, QueryArticlesBy } from './article.type'
import type { Paginated } from './pagination.type'
import type { Partialable } from '@aiszlab/relax/types'

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: {
            keyArgs: false,

            merge: (
              existing: Partialable<Paginated<Article>>,
              incoming: Paginated<Article>,
              { args }: FieldFunctionOptions<QueryArticlesBy>
            ) => {
              const { limit = 0, page = 1 } = args?.paginateBy ?? {}
              const offset = (page - 1) * limit
              const merged = existing?.items.slice(0) ?? []

              incoming.items.forEach((item, index) => {
                merged[offset + index] = item
              })

              return {
                items: merged,
                total: incoming.total
              }
            }
          }
        }
      }
    }
  }),

  link: from([
    onError(({ graphQLErrors, networkError }) => {
      const errorMessage = graphQLErrors?.[0].message ?? networkError?.message
      if (!errorMessage) return

      import('musae')
        .then((_) => {
          _.Notification.error({
            title: '接口调用异常！',
            description: errorMessage
          })
        })
        .catch(() => {
          console.error(errorMessage)
        })
    }),
    new HttpLink({
      uri: 'https://api.fantufantu.com'
    })
  ])
})

export { client }
