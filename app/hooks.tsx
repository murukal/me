import { FC, MouseEventHandler, useMemo } from 'react'
import { GraphQL, JavaScript, NodeJS, React, Typescript } from '@/components/stack-logos'

interface Category {
  label: string
  render: FC
}

/**
 * @description
 * categories
 */
export const useCategories = () => {
  const categories = useMemo<Category[]>(() => {
    return [
      {
        label: 'GraphQL',
        render: GraphQL
      },

      {
        label: 'JavaScript',
        render: JavaScript
      },
      {
        label: 'NodeJS',
        render: NodeJS
      },
      {
        label: 'React',
        render: React
      },
      {
        label: 'Typescript',
        render: Typescript
      }
    ]
  }, [])

  return {
    categories
  }
}

interface Link {
  label: string
  onClick: MouseEventHandler
}

interface LinkGroup {
  title: string
  links: Link[]
}

/**
 * @description
 * footer links
 */
export const useFooterLinks = ({ categories }: { categories: Category[] }) => {
  const categoryLinks = useMemo<Link[]>(() => {
    return categories.map((item) => {
      return {
        label: item.label,
        onClick: (event) => {
          event.preventDefault()
        }
      }
    })
  }, [categories])

  return useMemo<LinkGroup[]>(() => {
    return [
      {
        title: 'category',
        links: categoryLinks
      },
      {
        title: 'about me',
        links: categoryLinks
      },
      {
        title: 'get in touch',
        links: categoryLinks
      },
      {
        title: 'follow us',
        links: categoryLinks
      }
    ]
  }, [categoryLinks])
}
