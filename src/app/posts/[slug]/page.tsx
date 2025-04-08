import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "포스트를 찾을 수 없습니다" };

  return {
    title: post.title,
    description: post.description,
  };
}

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-muted-foreground mb-4">{post.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <time dateTime={post.date}>
            {format(new Date(post.date), "yyyy년 MM월 dd일")}
          </time>
          <div className="text-muted-foreground">{post.category}</div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {post.coverImage && (
          <div className="relative w-full h-[400px] mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
      </div>
      <article className={cn("prose dark:prose-invert max-w-none")}>
        {post.content && <MDXRemote source={post.content} />}
      </article>
    </div>
  );
}
