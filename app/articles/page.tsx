import { ARTICLES } from "@/api/article";
import { query } from "@/api";
import ArticleIntros from "@/components/article/intros";
import type { FilterArticlesBy } from "@/api/article.type";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    category?: string;
  }>;
}

const PAGE = 1;
const LIMIT = 10;

const Page = async ({ searchParams }: Props) => {
  const { category } = await searchParams;

  const filterBy: FilterArticlesBy = {
    ...(!!category && {
      categoryCodes: [category],
    }),
  };

  const { data } = await query(ARTICLES, {
    variables: {
      paginateBy: {
        limit: LIMIT,
        page: PAGE,
      },
      filterBy,
    },
  });

  if (data.articles.items.length === 0) {
    redirect("/404");
  }

  return (
    <ArticleIntros
      defaultValue={data.articles.items}
      defaultTotal={data.articles.total}
      defaultPage={PAGE}
      defaultLimit={LIMIT}
      filterBy={filterBy}
    />
  );
};

export default Page;
