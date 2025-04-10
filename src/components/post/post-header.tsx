import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
  coverImage?: string;
}

export default function PostHeader({
  title,
  date,
  tags,
  coverImage,
}: PostHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
        {title}
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4">
        {new Date(date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {coverImage && (
        <div className="mb-6">
          <Image
            src={coverImage}
            alt={title}
            width={1000}
            height={1000}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  );
}
