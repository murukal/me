import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  type DocumentNode,
  type FieldFunctionOptions,
  type OperationVariables,
  type QueryOptions,
  type TypedDocumentNode
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import type { Article } from './article.type'
import type { PaginateBy, Paginated } from './pagination.type'
import type { Partialable } from '@aiszlab/relax/types'
import type { Category } from './category.type'
import { ApplicationToken } from '@/assets/token'
import { replace } from '@aiszlab/relax'

const mergePaginated = <T>(
  existing: Partialable<Paginated<T>>,
  incoming: Paginated<T>,
  { args }: FieldFunctionOptions<{ paginateBy?: PaginateBy }>
) => {
  const { limit = 0, page = 1 } = args?.paginateBy ?? {}
  const offset = (page - 1) * limit

  return {
    // lazy load, current page is last page
    items: replace(existing?.items ?? [], incoming.items, offset, existing?.items.length),
    total: incoming.total
  }
}

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: {
            keyArgs: ['filterBy', 'paginateBy'],
            merge: mergePaginated<Article>
          },
          articleCategories: {
            keyArgs: ['filterBy', 'paginateBy'],
            merge: mergePaginated<Category>
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
    createHttpLink({
      uri: 'https://api.fantufantu.com',
      fetch: async (uri, options) => {
        const _authenticated = (
          await Promise.all([
            new Promise((resolve) =>
              resolve(globalThis.window.sessionStorage.getItem(ApplicationToken.Authenticated))
            ).catch(() => null),
            import('next/headers')
              .then(({ cookies }) => cookies().get(ApplicationToken.Authenticated)?.value)
              .catch(() => null)
          ])
        ).find((_) => !!_)

        const _headers = new Headers(options?.headers)

        if (_authenticated) {
          _headers.append('Authorization', `Bearer ${_authenticated}`)
        }

        return await fetch(uri, {
          ...options,
          headers: Array.from(_headers.entries())
        })
      }
    })
  ])
})

/**
 * @description
 * server query
 */
const query = <D, V extends OperationVariables>(
  query: DocumentNode | TypedDocumentNode<D, V>,
  options: Pick<QueryOptions<V, D>, 'variables'>
) => {
  return client.query<D, V>({
    fetchPolicy: 'no-cache',
    query,
    variables: options.variables
  })
}

export { client, query }
