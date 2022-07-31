import * as fs from "node:fs";
import * as path from "node:path";
import frontmatter from "front-matter";
import { parseMarkdown } from "~/markdown.server";

interface Doc {
  fullPath: string;
  slug: string;
  attributes: {
    title: string;
    description?: string;
  };
}

interface DocWithHTML extends Doc {
  html: string;
}

export function getDocBySlug(slug: string): DocWithHTML | undefined {
  const dir = path.resolve(process.cwd(), "../../docs");
  const fullPath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const markdown = fs.readFileSync(fullPath, "utf8");
  const parsed = parseMarkdown<Doc["attributes"]>(markdown);

  return {
    attributes: parsed.attributes,
    fullPath,
    html: parsed.html,
    slug,
  };
}

export function getDocs(
  dir = path.resolve(process.cwd(), "../../docs"),
  baseDir = path.resolve(process.cwd(), "../../docs")
): Doc[] {
  const docs: Doc[] = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && entry.endsWith(".md")) {
      const relativePath = path.relative(baseDir, fullPath);
      const slug = relativePath.replace(/\.md$/, "").replace(/_index$/, "");

      const markdown = fs.readFileSync(fullPath, "utf8");
      const { attributes } = frontmatter<Doc["attributes"]>(markdown);

      docs.push({
        fullPath,
        slug,
        attributes,
      });
    } else if (stat.isDirectory()) {
      docs.push(...getDocs(fullPath, baseDir));
    }
  }

  return docs;
}
