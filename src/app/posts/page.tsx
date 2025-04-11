import { Suspense } from "react";
import { getAllPosts, getAllCategories, getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";
import { CategoryFilter } from "@/components/post/category-filter";
import Loading from "./loading";

// 데이터 가져오기 함수에 캐싱 설정
export const revalidate = 3600; // 1시간마다 재검증

// 정적 생성을 위한 경로 생성
export async function generateStaticParams() {
  const categories = getAllCategories();

  return [{ category: "all" }, ...categories.map((category) => ({ category }))];
}

// 타입 정의
interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostPage({ searchParams }: Props) {
  const { category = "all" } = await searchParams;

  // 병렬로 데이터 로드
  const categoriesPromise = getAllCategories();

  // 카테고리에 따라 포스트 데이터 가져오기
  const postsPromise =
    category === "all" ? getAllPosts() : getPostsByCategory(category);

  // 병렬로 모든 데이터가 준비될 때까지 대기
  const [categories, posts] = await Promise.all([
    categoriesPromise,
    postsPromise,
  ]);

  // 포스트를 왼쪽 컬럼과 오른쪽 컬럼으로 분리
  const leftPosts = posts.filter((_, index) => index % 2 === 0);
  const rightPosts = posts.filter((_, index) => index % 2 === 1);

  return (
    <div className="py-8">
      <div className="max-w-3xl">
        <div className="max-w-4xl mx-auto">
          <CategoryFilter categories={categories} activeCategory={category} />
        </div>

        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </div>
    </div>
  );
}
