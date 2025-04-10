import { getAllPosts } from "@/lib/posts";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // 블로그 도메인 (실제 도메인으로 변경 필요)
  const baseUrl = "https://jblog-nine.vercel.app";

  // 현재 날짜
  const currentDate = new Date().toISOString();

  // 모든 게시물 가져오기
  const posts = getAllPosts();

  // 기본 페이지
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // 게시물 페이지
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 모든 페이지 병합
  return [...staticPages, ...postPages];
}
