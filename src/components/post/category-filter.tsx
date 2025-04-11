import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link href="/posts" className="flex">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          size="xs"
          className="font-medium min-w-[4rem] min-h-[1.75rem] border"
        >
          ALL
        </Button>
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/posts?category=${category}`}
          className="flex"
        >
          <Button
            variant={activeCategory === category ? "default" : "outline"}
            size="xs"
            className="font-medium min-w-[4rem] min-h-[1.75rem] border"
          >
            {category}
          </Button>
        </Link>
      ))}
    </div>
  );
}
