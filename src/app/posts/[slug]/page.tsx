import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostHeader from "@/components/post/post-header";
import TocContainer from "@/components/post/toc-container";
import { extractTocFromMarkdown } from "@/lib/toc";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // TOC 아이템 추출
  const tocItems = post.content ? extractTocFromMarkdown(post.content) : [];

  return (
    <div className="relative max-w-5xl mx-auto">
      <article className="prose prose-sm sm:prose-base dark:prose-invert w-full max-w-[calc(100vw-2rem)] sm:max-w-2xl md:max-w-3xl mx-auto py-6 px-1">
        <PostHeader
          title={post.title}
          date={post.date}
          tags={post.tags}
          coverImage={post.coverImage || undefined}
        />

        {post.content && (
          <MDXRemote
            source={post.content}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkBreaks],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: false,
                    },
                  ],
                ],
                format: "mdx",
              },
            }}
          />
        )}
      </article>

      <TocContainer items={tocItems} />
    </div>
  );
}
