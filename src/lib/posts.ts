import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/post";

// 컨텐츠 디렉토리 경로
const contentDirectory = path.join(process.cwd(), "contents");

// 모든 카테고리 가져오기
export function getAllCategories(): string[] {
  try {
    return fs
      .readdirSync(contentDirectory)
      .filter((dir) =>
        fs.statSync(path.join(contentDirectory, dir)).isDirectory()
      );
  } catch (error) {
    console.error("카테고리를 읽는 중 오류 발생:", error);
    return [];
  }
}

// 특정 카테고리의 모든 포스트 가져오기
export function getPostsByCategory(category: string): Post[] {
  const categoryPath = path.join(contentDirectory, category);

  try {
    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const fileNames = fs
      .readdirSync(categoryPath)
      .filter(
        (fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx")
      );

    const posts = fileNames.map((fileName) => {
      // 파일명에서 확장자 제거하여 slug 생성
      const slug = fileName.replace(/\.mdx?$/, "");

      // 포스트 내용 읽기
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // gray-matter를 사용하여 메타데이터 파싱
      const { data, content } = matter(fileContents);

      // 필요한 데이터 추출
      const post: Post = {
        slug,
        title: data.title || slug,
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        description: data.description || "",
        category: category,
        tags: data.tags || [],
        coverImage: data.coverImage || null,
        content,
      };

      return post;
    });

    // 날짜 기준 내림차순 정렬
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error(`${category} 카테고리의 포스트를 읽는 중 오류 발생:`, error);
    return [];
  }
}

// 모든 포스트 가져오기
export function getAllPosts(): Post[] {
  try {
    const categories = getAllCategories();
    let allPosts: Post[] = [];

    categories.forEach((category) => {
      const postsInCategory = getPostsByCategory(category);
      allPosts = [...allPosts, ...postsInCategory];
    });

    // 날짜 기준 내림차순 정렬
    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("모든 포스트를 읽는 중 오류 발생:", error);
    return [];
  }
}

// 특정 포스트 가져오기
export function getPostBySlug(slug: string): Post | null {
  try {
    const categories = getAllCategories();

    for (const category of categories) {
      const categoryPath = path.join(contentDirectory, category);
      const possibleExtensions = [".md", ".mdx"];

      for (const ext of possibleExtensions) {
        const fullPath = path.join(categoryPath, `${slug}${ext}`);

        if (fs.existsSync(fullPath)) {
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            slug,
            title: data.title || slug,
            date: data.date
              ? new Date(data.date).toISOString()
              : new Date().toISOString(),
            description: data.description || "",
            category: category,
            tags: data.tags || [],
            coverImage: data.coverImage || null,
            content,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`${slug} 포스트를 읽는 중 오류 발생:`, error);
    return null;
  }
}
