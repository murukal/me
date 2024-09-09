import { FC, MouseEventHandler, useMemo } from 'react'
import { GraphQL, JavaScript, NodeJS, React, Typescript } from '@/components/stack-logos'

interface Category {
  label: string
  logo: FC
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
        logo: GraphQL
      },

      {
        label: 'JavaScript',
        logo: JavaScript
      },
      {
        label: 'NodeJS',
        logo: NodeJS
      },
      {
        label: 'React',
        logo: React
      },
      {
        label: 'Typescript',
        logo: Typescript
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
