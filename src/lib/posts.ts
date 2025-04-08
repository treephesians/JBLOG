import { Post } from "@/types/post";

// 예시용 샘플 데이터
export const samplePosts: Post[] = [
  {
    title: "모던 CSS 테크닉 5가지",
    date: "2025-03-10",
    tags: ["Web", "CSS", "Frontend"],
    description:
      "최신 CSS 기법을 활용하여 더 효율적인 스타일링을 구현하는 방법",
    category: "web",
    featured: false,
    slug: "modern-css-techniques2",
  },
  {
    title: "Streaming SSR",
    date: "2025-02-15",
    tags: ["Web", "매일매일", "SSR"],
    description: "리액트에서 스트리밍 SSR을 사용하여 웹 성능을 향상시키는 방법",
    category: "frontend",
    featured: true,
    coverImage: "/images/streaming-ssr.jpg",
    slug: "streaming-ssr1",
  },
  {
    title: "모던 CSS 테크닉 5가지",
    date: "2024-11-10",
    tags: ["Web", "CSS", "Frontend"],
    description:
      "최신 CSS 기법을 활용하여 더 효율적인 스타일링을 구현하는 방법",
    category: "web",
    featured: false,
    slug: "modern-css-techniques",
  },

  {
    title: "Streaming SSR",
    date: "2023-04-15",
    tags: ["Web", "매일매일", "SSR"],
    description: "리액트에서 스트리밍 SSR을 사용하여 웹 성능을 향상시키는 방법",
    category: "frontend",
    featured: true,
    coverImage: "/images/streaming-ssr.jpg",
    slug: "streaming-ssr3",
  },
  {
    title: "모던 CSS 테크닉 5가지",
    date: "2022-05-10",
    tags: ["Web", "CSS", "Frontend"],
    description:
      "최신 CSS 기법을 활용하여 더 효율적인 스타일링을 구현하는 방법",
    category: "web",
    featured: false,
    slug: "modern-css-techniques4",
  },
];

export function getAllPosts(): Post[] {
  // 실제 구현에서는 MDX 파일을 읽어와 정보를 파싱할 수 있습니다
  return samplePosts;
}

export function getPostsByCategory(category: string): Post[] {
  return samplePosts.filter((post) => post.category === category);
}

export function getPostBySlug(slug: string): Post | undefined {
  return samplePosts.find((post) => post.slug === slug);
}
