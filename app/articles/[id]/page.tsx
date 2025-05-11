import { ARTICLE } from "@/api/article";
import Article from "@/components/article";
import { query } from "@/api";
import { redirect } from "next/navigation";

type Params = {
  id: string;
};

const Page = async ({ params }: { params: Promise<Params> }) => {
  const _response = await query(ARTICLE, {
    variables: {
      id: +(await params).id,
    },
  }).catch(() => null);
  const article = _response?.data.article;

  if (!article) {
    redirect("/404");
  }

  return <Article article={article} />;
};

export default Page;
