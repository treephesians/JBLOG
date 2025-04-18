import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { PostCardImage } from "./post-card-image";

interface PostCardProps {
  post: Post;
}

// 메인 PostCard 컴포넌트 (서버 컴포넌트)
export function PostCard({ post }: PostCardProps) {
  const hasImage = !!post.coverImage;
  const formattedDate = format(new Date(post.date), "yyyy년 MM월 dd일", {
    locale: ko,
  });

  return (
    <Link href={`/posts/${post.slug}`} className="block w-full">
      <Card className="overflow-hidden transition-all w-full flex flex-col shadow-sm hover:shadow-lg group border hover:border-pink-300 dark:hover:border-primary/50 hover:translate-y-[-4px] duration-300">
        {hasImage ? (
          <div className="relative w-full overflow-hidden pb-[52%]">
            {/* 이미지는 클라이언트 컴포넌트로 분리 */}
            <PostCardImage src={post.coverImage!} alt={post.title} />
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="category">{post.category}</Badge>
            </div>
          </div>
        ) : (
          <div className="flex items-center px-3 pt-3">
            <Badge variant="category">{post.category}</Badge>
          </div>
        )}
        <div className="flex flex-col">
          <CardHeader className="p-3">
            <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
            <CardDescription className="text-xs">
              {formattedDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-sm line-clamp-2 text-muted-foreground">
              {post.description}
            </p>
          </CardContent>
          <CardFooter className="p-3 pt-0 flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
