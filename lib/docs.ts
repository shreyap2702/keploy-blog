import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type DocFrontmatter = {
  title: string;
  description: string;
  order: number;
};

export type Doc = DocFrontmatter & {
  slug: string;
  content: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const contentDirectory = path.join(process.cwd(), "content");

function parseHeadingToId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function parseHeadings(content: string): TocItem[] {
  const matches = content.matchAll(/^(##|###)\s+(.+)$/gm);

  return [...matches].map((match) => {
    const level = match[1] === "##" ? 2 : 3;
    const text = match[2].trim();

    return {
      id: parseHeadingToId(text),
      text,
      level,
    };
  });
}

async function readDocFile(fileName: string): Promise<Doc> {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = await fs.readFile(path.join(contentDirectory, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    order: Number(data.order ?? 999),
    content,
  };
}

export async function getAllDocs(): Promise<Doc[]> {
  const files = await fs.readdir(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));
  const docs = await Promise.all(mdxFiles.map(readDocFile));

  return docs.sort((a, b) => a.order - b.order);
}

export async function getDocBySlug(slug: string): Promise<Doc | null> {
  try {
    return await readDocFile(`${slug}.mdx`);
  } catch {
    return null;
  }
}

export async function getDocNav() {
  const docs = await getAllDocs();
  return docs.map(({ slug, title, description, order }) => ({
    slug,
    title,
    description,
    order,
  }));
}

export function getDocToc(content: string): TocItem[] {
  return parseHeadings(content);
}
