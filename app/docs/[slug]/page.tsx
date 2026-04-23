import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/MDXRenderer";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { getAllDocs, getDocBySlug, getDocNav, getDocToc } from "@/lib/docs";

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1400px] gap-2 px-4 md:px-6">
        <Sidebar items={nav} />
        <main className="min-w-0 flex-1 py-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            {doc.description}
          </p>
          <MDXRenderer source={doc.content} />
        </main>
        <TableOfContents items={toc} />
      </div>
    </div>
  );
}
