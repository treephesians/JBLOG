import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Loading() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <article className="prose prose-sm sm:prose-base dark:prose-invert w-full max-w-[calc(100vw-2rem)] sm:max-w-2xl md:max-w-3xl mx-auto py-6 px-1">
        {/* 포스트 헤더 스켈레톤 */}
        <div className="mb-8">
          {/* 타이틀 스켈레톤 */}
          <Skeleton className="h-10 sm:h-12 md:h-14 w-full mb-2" />

          {/* 날짜 스켈레톤 */}
          <Skeleton className="h-4 sm:h-5 w-32 mb-4" />

          {/* 태그 스켈레톤 */}
          <div className="flex flex-wrap gap-1 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Badge key={i} variant="tag">
                <Skeleton className="h-4 w-16 bg-transparent" />
              </Badge>
            ))}
          </div>

          {/* 커버 이미지 스켈레톤 */}
          <div className="mb-6">
            <Skeleton className="w-full h-64 md:h-80 rounded-lg" />
          </div>
        </div>

        {/* 본문 컨텐츠 스켈레톤 */}
        <div className="space-y-4">
          {/* 본문 단락 스켈레톤 */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`p-${i}`} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ))}

          {/* 코드 블록 스켈레톤 */}
          <Skeleton className="h-40 w-full rounded-md my-4" />

          {/* 더 많은 단락 스켈레톤 */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`p2-${i}`} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
          ))}

          {/* 인용구 스켈레톤 */}
          <div className="border-l-4 border-accent pl-4 py-1 my-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5 mt-2" />
          </div>

          {/* 최종 단락 스켈레톤 */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`p3-${i}`} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          ))}
        </div>
      </article>

      {/* 목차(TOC) 스켈레톤 */}
      <div className="hidden xl:block fixed right-10 top-32 w-56">
        <div className="p-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`toc-${i}`} className="pl-2">
                <Skeleton className="h-4 w-36" />
                {i % 2 === 0 && (
                  <div className="pl-4 mt-2 space-y-2">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <Skeleton key={`subtoc-${i}-${j}`} className="h-4 w-28" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
