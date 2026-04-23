import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Callout } from "@/components/mdx/Callout";
import { Image } from "@/components/mdx/Image";

type MDXRendererProps = {
  source: string;
};

export async function MDXRenderer({ source }: MDXRendererProps) {
  const { content } = await compileMDX({
    source,
    components: {
      Callout,
      Image,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return <article className="prose-docs max-w-3xl">{content}</article>;
}
