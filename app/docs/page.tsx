import { redirect } from "next/navigation";
import { getAllDocs } from "@/lib/docs";

export default async function DocsIndexPage() {
  const docs = await getAllDocs();
  const firstDoc = docs[0];

  if (!firstDoc) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">No docs found</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          Add `.mdx` files to the `content` folder to start building docs.
        </p>
      </main>
    );
  }

  redirect(`/docs/${firstDoc.slug}`);
}
