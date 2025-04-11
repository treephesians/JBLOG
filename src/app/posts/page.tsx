import { getAllPosts, getAllCategories, getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";
import { CategoryFilter } from "@/components/post/category-filter";
import { Post } from "@/types/post";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostPage({ searchParams }: Props) {
  const { category = "all" } = await searchParams;

  // 모든 카테고리 가져오기
  const categories = getAllCategories();

  // 카테고리에 따라 포스트 필터링
  let posts: Post[];
  if (category === "all") {
    posts = getAllPosts();
  } else {
    posts = getPostsByCategory(category);
  }

  // 포스트를 왼쪽 컬럼과 오른쪽 컬럼으로 분리
  const leftPosts = posts.filter((_, index) => index % 2 === 0);
  const rightPosts = posts.filter((_, index) => index % 2 === 1);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <CategoryFilter categories={categories} activeCategory={category} />
        </div>

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

        {posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              이 카테고리에 포스트가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
