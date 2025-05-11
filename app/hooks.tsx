import { type MouseEventHandler, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "@/api/category";

interface Link {
  label: string;
  onClick?: MouseEventHandler;
  href?: string;
}

interface LinkGroup {
  title: string;
  links: Link[];
}

/**
 * @description
 * footer links
 */
export const useFooterLinks = () => {
  const { data: { articleCategories: { items = [] } = {} } = {} } = useQuery(
    CATEGORIES,
    {
      variables: {
        paginateBy: { limit: 5, page: 1 },
      },
      fetchPolicy: "cache-only",
    }
  );

  const categoryLinks = useMemo<Link[]>(() => {
    return items.map((item) => {
      return {
        label: item.name,
        onClick: (event) => {
          event.preventDefault();
        },
      };
    });
  }, [items]);

  const aboutMeLinks = useMemo<Link[]>(() => {
    return [
      {
        label: "Homepage",
        href: "https://aisz.dev/about-us",
      },
      {
        label: "Github",
        href: "https://github.com/murukal",
      },
    ];
  }, []);

  return useMemo<LinkGroup[]>(() => {
    return [
      {
        title: "category",
        links: categoryLinks,
      },
      {
        title: "about me",
        links: aboutMeLinks,
      },
      {
        title: "get in touch",
        links: [
          {
            label: "Feedback",
            href: "https://admin.fantufantu.com/issue",
          },
        ],
      },
      {
        title: "follow us",
        links: [
          {
            label: "Github",
            href: "https://github.com/murukal",
          },
        ],
      },
    ];
  }, [aboutMeLinks, categoryLinks]);
};
