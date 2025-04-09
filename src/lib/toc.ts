import { TocItem } from "@/components/post/toc";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const tocItems: TocItem[] = [];
  const slugger = new GithubSlugger();

  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);

  visit(tree, "heading", (node) => {
    if (node.depth > 0 && node.depth < 4) {
      // h2, h3, h4만 포함
      const text = toString(node);
      const id = slugger.slug(text);

      tocItems.push({
        id,
        text,
        level: node.depth,
      });
    }
  });

  return tocItems;
}
