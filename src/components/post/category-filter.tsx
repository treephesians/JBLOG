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
          className="text-sm"
        >
          All
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
            className="text-sm"
          >
            {category}
          </Button>
        </Link>
      ))}
    </div>
  );
}
