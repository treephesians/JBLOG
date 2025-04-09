import Image from "next/image";

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
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        {new Date(date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm"
            >
              {tag}
            </span>
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
