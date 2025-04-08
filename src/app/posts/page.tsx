import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";

export default function PostPage() {
  const posts = getAllPosts();

  // 포스트를 왼쪽 컬럼과 오른쪽 컬럼으로 분리
  const leftPosts = posts.filter((_, index) => index % 2 === 0);
  const rightPosts = posts.filter((_, index) => index % 2 === 1);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            {leftPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="space-y-6">
            {rightPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
