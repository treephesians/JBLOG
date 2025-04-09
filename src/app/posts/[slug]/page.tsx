import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import MdxLayout from "@/components/post/mdx-layout";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

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

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-4">
          {new Date(post.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.coverImage && (
          <div className="mb-6">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1000}
              height={1000}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <MdxLayout>
        {post.content && <MDXRemote source={post.content} />}
      </MdxLayout>
    </article>
  );
}
