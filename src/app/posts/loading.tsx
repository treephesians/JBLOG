import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Loading() {
  return (
    <div className="py-8">
      <div className="max-w-3xl">
        <div className="max-w-4xl mx-auto">
          {/* 카테고리 필터 스켈레톤 */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="min-w-[4.1rem] h-7 rounded-md" />
              ))}
            </div>
          </div>
        </div>

        {/* 포스트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="block w-full">
                <Card className="overflow-hidden transition-all w-full flex flex-col shadow-sm border hover:shadow-lg hover:border-pink-300 dark:hover:border-primary/50 hover:translate-y-[-4px] duration-300">
                  {/* 50%는 이미지가 있는 카드, 50%는 이미지가 없는 카드로 표시 */}
                  {Math.random() > 0.5 ? (
                    <div className="relative w-full overflow-hidden pb-[52%]">
                      <Skeleton className="absolute inset-0" />
                      <div className="absolute top-2 left-2">
                        <Badge variant="category">
                          <Skeleton className="h-4 w-14 bg-transparent" />
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center px-3 pt-3">
                      <Badge variant="category">
                        <Skeleton className="h-4 w-14 bg-transparent" />
                      </Badge>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg line-clamp-2">
                        <Skeleton className="h-6 w-full" />
                      </CardTitle>
                      <CardDescription className="text-xs">
                        <Skeleton className="h-3 w-32 mt-1" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-sm line-clamp-2 text-muted-foreground">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4 mt-1" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex flex-wrap gap-1">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <Badge key={idx} variant="tag">
                          <Skeleton className="h-4 w-12 bg-transparent" />
                        </Badge>
                      ))}
                    </CardFooter>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="block w-full">
                <Card className="overflow-hidden transition-all w-full flex flex-col shadow-sm border hover:shadow-lg hover:border-pink-300 dark:hover:border-primary/50 hover:translate-y-[-4px] duration-300">
                  {/* 50%는 이미지가 있는 카드, 50%는 이미지가 없는 카드로 표시 */}
                  {Math.random() > 0.5 ? (
                    <div className="relative w-full overflow-hidden pb-[52%]">
                      <Skeleton className="absolute inset-0" />
                      <div className="absolute top-2 left-2">
                        <Badge variant="category">
                          <Skeleton className="h-4 w-14 bg-transparent" />
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center px-3 pt-3">
                      <Badge variant="category">
                        <Skeleton className="h-4 w-14 bg-transparent" />
                      </Badge>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg line-clamp-2">
                        <Skeleton className="h-6 w-full" />
                      </CardTitle>
                      <CardDescription className="text-xs">
                        <Skeleton className="h-3 w-32 mt-1" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="text-sm line-clamp-2 text-muted-foreground">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4 mt-1" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex flex-wrap gap-1">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <Badge key={idx} variant="tag">
                          <Skeleton className="h-4 w-12 bg-transparent" />
                        </Badge>
                      ))}
                    </CardFooter>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
