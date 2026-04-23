import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/MDXRenderer";
import { DocKeyboardNav } from "@/components/DocKeyboardNav";
import { Navbar } from "@/components/Navbar";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import {
  getAllDocs,
  getDocBySlug,
  getDocNav,
  getDocToc,
  getEstimatedReadTime,
} from "@/lib/docs";

type DocPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} | Keploy Docs`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const [doc, nav] = await Promise.all([getDocBySlug(slug), getDocNav()]);

  if (!doc) {
    notFound();
  }

  const toc = getDocToc(doc.content);
  const readTime = getEstimatedReadTime(doc.content);
  const activeIndex = nav.findIndex((item) => item.slug === slug);
  const prevDoc = activeIndex > 0 ? nav[activeIndex - 1] : undefined;
  const nextDoc =
    activeIndex >= 0 && activeIndex < nav.length - 1
      ? nav[activeIndex + 1]
      : undefined;

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Navbar navItems={nav} />
      <div className="mx-auto flex w-full max-w-[1400px] gap-2 px-4 md:px-6">
        <Sidebar items={nav} />
        <main className="min-w-0 flex-1 py-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            {doc.description}
          </p>
          <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
            {readTime} min read
          </p>
          <MDXRenderer source={doc.content} />
          <DocKeyboardNav prev={prevDoc} next={nextDoc} />
        </main>
        <TableOfContents items={toc} />
      </div>
    </div>
  );
}
