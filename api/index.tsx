import { ApolloClient, type FieldFunctionOptions, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import type { Article, QueryArticlesBy } from './article.type'
import type { Paginated } from './pagination.type'

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: {
            keyArgs: ['paginateBy', 'filterBy'],

            merge: (
              existing: Paginated<Article>,
              incoming: Paginated<Article>,
              { args }: FieldFunctionOptions<QueryArticlesBy>
            ) => {
              console.log(args)
              return {
                items: [],
                total: 0
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
