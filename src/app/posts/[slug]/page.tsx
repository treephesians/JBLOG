import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostHeader from "@/components/post/post-header";
import TocContainer from "@/components/post/toc-container";
import { extractTocFromMarkdown } from "@/lib/toc";
import Script from "next/script";

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
      title: "JBLOG | 포스트를 찾을 수 없습니다",
      description: "요청하신 게시물을 찾을 수 없습니다.",
    };
  }

  return {
    title: `JBLOG | ${post.title}`,
    description: post.description || `${post.title}에 대한 게시물입니다.`,
    keywords: post.tags || [],
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `https://jblog.vercel.app/posts/${post.slug}`,
      title: post.title,
      description: post.description || `${post.title}에 대한 게시물입니다.`,
      publishedTime: post.date,
      authors: ["Junbeom"],
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `JBLOG | ${post.title}`,
      description: post.description || `${post.title}에 대한 게시물입니다.`,
      images: post.coverImage ? [post.coverImage] : ["/og-image.jpg"],
    },
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

  // JSON-LD 구조화된 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || `${post.title}에 대한 게시물입니다.`,
    author: {
      "@type": "Person",
      name: "Junbeom",
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Organization",
      name: "JBLOG",
      logo: {
        "@type": "ImageObject",
        url: "https://jblog-nine.vercel.app/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jblog-nine.vercel.app/posts/${post.slug}`,
    },
    image: post.coverImage || "https://jblog-nine.vercel.app/og-image.jpg",
    keywords: post.tags?.join(", ") || "",
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
